import { Button } from "../HomeScreen.styles";
import { EndStatusContainer, Solution, Status } from "./endStatus.styles";

export const EndStatus = ({ guessed, solutionName, handlePlayAgain }: { guessed: boolean, solutionName: string, handlePlayAgain: () => void }) => {

    return (
        <EndStatusContainer>
            {guessed ? (
                <Status className="guessed">You Nailed it!</Status>
            ) : (
                <Status className="notGuessed">Oh no! Better luck next time</Status>
            )}
            <h3>The answer was: <Solution>{solutionName}</Solution></h3>
            <Button onClick={handlePlayAgain}>Play Again</Button>
        </EndStatusContainer>
    );
};