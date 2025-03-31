import { AttempStyled } from "./attemps.styles";

export const Attemps = ({ attemps, guessed }: { attemps: string[], guessed: boolean }) => {

    return (
        <div>
            {attemps.toReversed().map((attemp, index) => (
                <AttempStyled key={index}> {index === 0 && guessed ? '✅' : '❌'} {attemp}</AttempStyled>
            ))}
        </div>
    );
};