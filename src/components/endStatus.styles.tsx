import { styled } from "@stitches/react"

export const EndStatusContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '20px',

})

export const Status = styled('h2', {
    fontSize: '23px',
    marginBottom: '-20px',
    '&.notGuessed': {
        color: 'rgb(185, 28, 28)',
    },
    '&.guessed': {
        color: 'rgb(5, 150, 105)',
    }

});

export const Solution = styled('span', {
    fontWeight: 'bold',
    color: 'rgb(5, 150, 105)',
    fontSize: '1.17em',
});
