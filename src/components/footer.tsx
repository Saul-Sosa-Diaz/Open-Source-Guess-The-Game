
import { Footer as StyledFooter } from './footer.styles.tsx';

export const Footer = () => {
    return (
        <StyledFooter>
            Based on the awesome{' '}
            <a href="https://guessthe.game/" target="_blank" rel="noopener noreferrer">
                Guess The.Game
            </a>
            . Built with ❤️ by Saúl Sosa.
        </StyledFooter>
    );
};