import { Button } from "primereact/button";

export const Clues = ({ maxNumberClues, actualClue, onClick }: { maxNumberClues: number, actualClue: number, onClick : (index: number) => void }) => {
    const baseClues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const clues = [...baseClues.slice(0, maxNumberClues - 1), "skip"];
    
    return (
        <div>
            {clues.map((clue, index) => (
                <Button onClick={() => onClick(index + 1)} disabled={index > actualClue - 1 && clue !== "skip"} key={index}>{clue}</Button>
            ))}
        </div>
    );
};