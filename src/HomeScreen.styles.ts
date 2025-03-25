import { styled } from '@stitches/react'

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
})

export const Image = styled('img', {
  width: '40%',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '400px',
  padding: '1rem',
})
