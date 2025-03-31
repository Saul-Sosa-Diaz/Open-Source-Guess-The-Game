import { Button } from "./clues.styles";

export const Clues = ({ maxNumberClues, actualClue, onClick }: { maxNumberClues: number, actualClue: number, onClick: (index: number) => void }) => {
    const baseClues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const clues = [...baseClues.slice(0, maxNumberClues - 1)];

    return (
        <div>
            {clues.map((clue, index) => (
                <Button onClick={() => onClick(index + 1)} disabled={index > actualClue - 1} key={index} className={index < actualClue - 1 ? 'past' : index == actualClue - 1 ? 'current' : ''}>{clue}</Button>
            ))}
            <Button onClick={() => onClick(actualClue + 1)} disabled={actualClue >= maxNumberClues} className={'skip'}>Skip </Button>
        </div>
    );
};