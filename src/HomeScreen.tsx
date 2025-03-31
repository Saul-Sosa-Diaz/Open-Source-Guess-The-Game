
import { useEffect, useState } from 'react';
import './HomeScreen.styles.ts';
import { Form, Image, MainContainer, Button, Title, AutoComplete, Wrapper } from './HomeScreen.styles.ts';
import { Clues } from './components/clues.tsx';
import { Attemps } from './components/attemps.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VIDEOGAMES } from './constants/videoGames.ts';
import { videoGame } from './types/videoGame.ts';
import { EndStatus } from './components/endStatus.tsx';
import { Footer } from './components/footer.tsx';

const queryClient = new QueryClient()

export const HomeScreen = () => {
    const [videoGameValue, setVideoGameValue] = useState<string>('');
    const [filteredVideogames, setFilteredVideogames] = useState<string[]>([]);
    const [attempts, setAttempts] = useState<string[]>([]);
    const [indexImage, setIndexImage] = useState<number>(1);
    const [currentMaxIndexClue, setMaxIndexClue] = useState<number>(1);
    const [maxNumberOfClues, setMaxNumberOfClues] = useState<number>(5);
    const [solution, setSolution] = useState<videoGame | null>();
    const [ended, setEnded] = useState<boolean>(false);
    const [guessed, setGuessed] = useState<boolean>(false);
    const [playAgain, setPlayAgain] = useState<boolean>(false);
    const options = VIDEOGAMES.map((videoGame) => videoGame.name);

    // update the max clue
    useEffect(() => {
        if (indexImage > currentMaxIndexClue) {
            const newMaxIndexClue = indexImage;
            setMaxIndexClue(newMaxIndexClue);
        }
    }, [indexImage, currentMaxIndexClue]);

    // set the solution and max number of clues
    useEffect(() => {
        const getRandomVideogame = (): videoGame => {
            const randomIndex = Math.floor(Math.random() * VIDEOGAMES.length);
            return VIDEOGAMES[randomIndex] as videoGame;
        }
        setVideoGameValue('');
        setGuessed(false);
        setEnded(false);
        setFilteredVideogames([]);
        setAttempts([]);
        setIndexImage(1);
        setMaxIndexClue(1);
        const randomVideogame = getRandomVideogame();
        setSolution(randomVideogame);
        setMaxNumberOfClues(randomVideogame.short_screenshots.length);
    }, [playAgain]);

    // Get if the game have been finished
    useEffect(() => {
        if (indexImage > maxNumberOfClues - 1) {
            setIndexImage(indexImage - 1);
            setEnded(true);
        }
    }, [indexImage, maxNumberOfClues]);

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

    const handleIncreaseIndex = () => {
        const currentIndexImage = currentMaxIndexClue;
        if (currentIndexImage >= maxNumberOfClues - 1) {
            setMaxIndexClue(currentIndexImage + 1);
            setEnded(true);
            return
        }
        setIndexImage(currentIndexImage + 1);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputValue = (event.currentTarget[0] as HTMLInputElement).value;
        const lowerInputValue = inputValue.toLowerCase();
        const isCorrect = solution?.name.toLowerCase() === lowerInputValue;
        const temporalAttemps = attempts;
        setAttempts([...temporalAttemps, inputValue]);
        setVideoGameValue('');
        if (isCorrect) {
            setGuessed(true);
            setEnded(true);
        } else {
            const currentIndexImage = indexImage;
            if (currentIndexImage >= maxNumberOfClues) {
                setEnded(true);
                return
            }
            handleIncreaseIndex()
        }
    };

    const handleChange = (event: { value: string }) => {
        const newValue = event.value;
        setVideoGameValue(newValue);
    };

    const handlePlayAgain = () => {
        const currentPlayAgain = playAgain;
        setPlayAgain(!currentPlayAgain);
    };


    return (
        <QueryClientProvider client={queryClient}>
            <Wrapper>
                <MainContainer>
                    <Title> Open Source Guess the Game 🎮🕹️</Title>
                    {solution && <>
                        <Image src={solution?.short_screenshots[indexImage].image} alt="Game" />
                        <Clues disabled={ended} guessed={guessed} increaseIndex={handleIncreaseIndex} changeImage={setIndexImage} maxNumberClues={maxNumberOfClues} actualClue={currentMaxIndexClue} />
                        {ended && <EndStatus guessed={guessed} solutionName={solution.name} handlePlayAgain={handlePlayAgain} />}
                        {!ended && <Form onSubmit={handleSubmit}>
                            <AutoComplete
                                disabled={ended}
                                appendTo="self"
                                value={videoGameValue}
                                completeMethod={search}
                                suggestions={filteredVideogames}
                                onChange={handleChange}
                                placeholder="Search for a Game..."
                            />
                            <Attemps attemps={attempts} guessed={guessed} />
                            <Button disabled={ended} type="submit">Submit</Button>
                        </Form>}

                    </>
                    }
                </MainContainer>
                <Footer />
            </Wrapper>
        </QueryClientProvider>
    );
}
