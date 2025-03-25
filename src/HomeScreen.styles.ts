import { styled } from '@stitches/react'

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
  minHeight: '100vh',
})

export const Image = styled('img', {
  width: '40%',
  height: 'auto',
  maxWidth: '30%',
  maxHeight: '30%',
  borderRadius: '1rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  margin: '1rem',
  border: '1px solid rgba(0, 0, 0, 0.1)',
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '400px',
  padding: '1rem',
})
