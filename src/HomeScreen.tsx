
import { useState } from 'react';
import './HomeScreen.styles.ts';
import { Form, MainContainer } from './HomeScreen.styles.ts';
import { AutoComplete } from 'primereact/autocomplete';
import { Clues } from './components/clues.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export const HomeScreen = () => {
    const [videoGameValue, setVideoGameValue] = useState<string>('');
    const [filteredVideogames, setFilteredVideogames] = useState<string[]>([]);
    const [image, setImage] = useState<number>(0);

    const options = [
        "Apex Legends",
        "Call of Duty: Warzone",
        "Counter",
        "Strike: Global Offensive",
        "Dota 2",
        "Fortnite",
        "Grand Theft Auto V",
        "League of Legends",
        "Minecraft",
        "Overwatch",
    ];

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
                <h1>Guess the Game</h1>
                    <Clues />
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
                <button onClick={() => setImage(image + 1)}>Next</button>
            </MainContainer>
        </QueryClientProvider>
    );
}
