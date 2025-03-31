import { Button } from "./clues.styles";

export const Clues = ({
    disabled,
    guessed,
    maxNumberClues,
    actualClue,
    changeImage,
    increaseIndex,
}: {
    disabled: boolean;
    guessed: boolean;
    maxNumberClues: number;
    actualClue: number;
    changeImage: (index: number) => void;
    increaseIndex: () => void;
}) => {
    const baseClues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const clues = [...baseClues.slice(0, maxNumberClues - 1)];

    return (
        <div>
            {clues.map((clue, index) => {
                let className = '';
                if (index < actualClue - 1) {
                    className = 'past';
                } else if (index === actualClue - 1) {
                    className = guessed ? 'currentGuessed' : 'current';
                }

                return (
                    <Button
                        onClick={() => changeImage(index + 1)}
                        disabled={index > actualClue - 1}
                        key={index}
                        className={className}
                    >
                        {clue}
                    </Button>
                );
            })}
            <Button
                onClick={() => increaseIndex()}
                disabled={actualClue >= maxNumberClues || disabled}
                className="skip"
            >
                Skip
            </Button>
        </div>
    );
};