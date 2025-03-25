
import { useEffect, useState } from 'react';
import './HomeScreen.styles.ts';
import { Form, Image, MainContainer } from './HomeScreen.styles.ts';
import { AutoComplete } from 'primereact/autocomplete';
import { Clues } from './components/clues.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VIDEOGAMES } from './constants/videoGames.ts';
import { videoGame } from './types/videoGame.ts';

const queryClient = new QueryClient()

export const HomeScreen = () => {
    const [videoGameValue, setVideoGameValue] = useState<string>('');
    const [filteredVideogames, setFilteredVideogames] = useState<string[]>([]);
    const [indexImage, setIndexImage] = useState<number>(1);
    const [maxIndexClue, setMaxIndexClue] = useState<number>(1);
    const [solution, setSolution] = useState<videoGame | null>();
    const options = VIDEOGAMES.map((videoGame) => videoGame.name);
    useEffect(() => {
        if (indexImage > maxIndexClue) {
            const newMaxIndexClue = indexImage;
            setMaxIndexClue(newMaxIndexClue);
        }
    }, [indexImage]);

    useEffect(() => {
        const getRandomVideogame = (): videoGame => {
            const randomIndex = Math.floor(Math.random() * VIDEOGAMES.length);
            return VIDEOGAMES[randomIndex] as videoGame;
        }
        const randomVideogame = getRandomVideogame();
        setSolution(randomVideogame);
    }, []);



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
        console.log("Mensaje enviado con:", videoGameValue);
    };

    const handleChange = (event: { value: string }) => {
        const newValue = event.value;
        setVideoGameValue(newValue);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <MainContainer>
                <h1>Guess the Game 🎮🕹️</h1>
                {solution && <>
                    <Image src={solution?.short_screenshots[indexImage].image} alt="Game" />
                    <Clues onClick={setIndexImage} maxNumberClues={solution?.short_screenshots.length} actualClue={maxIndexClue}/>
                    <Form onSubmit={handleSubmit}>
                        <AutoComplete
                            value={videoGameValue}
                            completeMethod={search}
                            suggestions={filteredVideogames}
                            onChange={handleChange}
                            placeholder="Search for a Game..."
                            dropdown
                        />
                        <button type="submit">Submit</button>
                    </Form>
                    <button onClick={() => setIndexImage(indexImage + 1)}>Next</button>
                    {solution.name}
                </>
                }
            </MainContainer>
        </QueryClientProvider>
    );
}
