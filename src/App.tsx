
import { useState } from 'react';
import './App.styles.ts';
import { Image, MainContainer } from './App.styles.ts';
import { AutoComplete } from 'primereact/autocomplete';

function App() {
  const [videoGameValue, setVideoGameValue] = useState<string>('');
  const [filteredVideogames, setFilteredVideogames] = useState<string[]>([]);

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
    <MainContainer>
      <Image src={"https://media.npr.org/assets/img/2023/01/14/this-is-fine_custom-b7c50c845a78f5d7716475a92016d52655ba3115.jpg"} />

      <form onSubmit={handleSubmit}>
        <AutoComplete
          value={videoGameValue}
          completeMethod={search}
          suggestions={filteredVideogames}
          onChange={handleChange}
          placeholder="Search for a Game..."
          dropdown
        />
        <button type="submit">Enviar</button>
      </form>
    </MainContainer>
  );
}


export default App;
