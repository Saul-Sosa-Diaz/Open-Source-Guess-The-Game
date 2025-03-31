
import { Footer as StyledFooter } from './footer.styles.tsx';

export const Footer = () => {
    return (
        <StyledFooter>
            Based on the awesome{' '}
            <a href="https://guess-the.game" target="_blank" rel="noopener noreferrer">
                guess-the.game
            </a>
            . Built with ❤️ by Saúl Sosa.
        </StyledFooter>
    );
};