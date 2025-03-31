
import { useEffect, useState } from 'react';
import './HomeScreen.styles.ts';
import { Form, Image, MainContainer, Button, Title, AutoComplete } from './HomeScreen.styles.ts';
import { Clues } from './components/clues.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VIDEOGAMES } from './constants/videoGames.ts';
import { videoGame } from './types/videoGame.ts';

const queryClient = new QueryClient()

export const HomeScreen = () => {
    const [videoGameValue, setVideoGameValue] = useState<string>('');
    const [filteredVideogames, setFilteredVideogames] = useState<string[]>([]);
    const [indexImage, setIndexImage] = useState<number>(1);
    const [currentMaxClue, setMaxIndexClue] = useState<number>(1);
    const [maxNumberOfClues, setMaxNumberOfClues] = useState<number>(5);
    const [solution, setSolution] = useState<videoGame | null>();
    const [ended, setEnded] = useState<boolean>(false);
    const options = VIDEOGAMES.map((videoGame) => videoGame.name);

    // update the max clue
    useEffect(() => {
        if (indexImage > currentMaxClue) {
            const newMaxIndexClue = indexImage;
            setMaxIndexClue(newMaxIndexClue);
        }
    }, [indexImage, currentMaxClue]);

    // set the solution and max number of clues
    useEffect(() => {
        const getRandomVideogame = (): videoGame => {
            const randomIndex = Math.floor(Math.random() * VIDEOGAMES.length);
            return VIDEOGAMES[randomIndex] as videoGame;
        }
        const randomVideogame = getRandomVideogame();
        setSolution(randomVideogame);
        setMaxNumberOfClues(randomVideogame.short_screenshots.length);
    }, []);

    // Get if the game have been finished
    useEffect(() => {
        if (indexImage > maxNumberOfClues) {
            setEnded(true);
        }
    }, [indexImage, maxNumberOfClues]);

    // Show alert when the game is over
    useEffect(() => {
        if (ended) {
            alert('Game Over');
        }
    }, [ended]);

    const search = (event: { query: string }) => {
        const includes = new Set();
        const startsWith = new Set();
        for (const name of options) {
            const lowerName = name.toLowerCase();
            const query = event.query.toLowerCase();
            if (lowerName.startsWith(query)) {
                startsWith.add(name);
            }
            if (lowerName.includes(query)) {
                includes.add(name);
            }
        }
        const onlyIncludes = Array.from(includes).filter(item => !startsWith.has(item)) as string[];
        const onlyStartsWith = Array.from(startsWith) as string[];
        onlyIncludes.sort();
        const sortedSuggestions = onlyStartsWith.concat(onlyIncludes);
        setFilteredVideogames(sortedSuggestions);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputValue = (event.currentTarget[0] as HTMLInputElement).value;
        const lowerInputValue = inputValue.toLowerCase();
        const isCorrect = solution?.name.toLowerCase() === lowerInputValue;
        if (isCorrect) {
            alert('Correct!');
        } else {
            setIndexImage(indexImage + 1);
        }
    };

    const handleChange = (event: { value: string }) => {
        const newValue = event.value;
        setVideoGameValue(newValue);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <MainContainer>
                <Title> Open Guess the Game 🎮🕹️</Title>
                {solution && <>
                    <Image src={solution?.short_screenshots[indexImage].image} alt="Game" />
                    <Clues onClick={setIndexImage} maxNumberClues={maxNumberOfClues} actualClue={currentMaxClue} />
                    <Form onSubmit={handleSubmit}>
                        <AutoComplete
                            appendTo="self"
                            value={videoGameValue}
                            completeMethod={search}
                            suggestions={filteredVideogames}
                            onChange={handleChange}
                            placeholder="Search for a Game..."
                        />
                        <Button type="submit">Submit</Button>
                    </Form>
                    {solution.name}
                </>
                }
            </MainContainer>
        </QueryClientProvider>
    );
}
