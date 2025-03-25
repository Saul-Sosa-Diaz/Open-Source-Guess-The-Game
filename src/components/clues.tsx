export const Clues = () => {
    const clues = [1, 2, 3, 4, 5, 6, 'Skip'];

    return (
        <div>
            {clues.map((clue, index) => (
                <button key={index}>{clue}</button>
            ))}
        </div>
    );
};