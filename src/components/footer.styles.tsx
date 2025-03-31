import { styled } from '@stitches/react';

export const Footer = styled('footer', {
    padding: '1rem',
    textAlign: 'center',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    fontSize: '1rem',
    color: 'white',

    a: {
        color: '$blue600',
        textDecoration: 'none',
        fontWeight: '500',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});