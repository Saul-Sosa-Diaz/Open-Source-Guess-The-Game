import { styled } from '@stitches/react'
import { Button as ButtonPrimeReact } from 'primereact/button'
import { AutoComplete as AutoCompletePrimeReact } from 'primereact/autocomplete'

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
  minHeight: '100vh',
})

export const Title = styled('h1', {
  fontSize: '2rem',
  color: '#ffffff',
  textAlign: 'center',
  margin: '1rem',
})

export const Image = styled('img', {
  width: '30%',
  weight: '30%',
  borderRadius: '0.5rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  margin: '1rem',
  border: '2px solid rgba(0, 0, 0, 0.6)',
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '400px',
  padding: '1rem',
})

export const Button = styled(ButtonPrimeReact, {
  padding: '8px 12px',
  width: '100%',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '20px',
  alignContent: 'center',
  display: 'flex',
  justifyContent: 'center',
  color: 'white',
  backgroundColor: '#059669',
})

export const AutoComplete = styled(AutoCompletePrimeReact, {
  '& .p-autocomplete': {
    width: '100%',
    color: '#ffffff',
    backgroundColor: '#ffffff',
  },
  '& .p-autocomplete-input': {
    width: '100%',
    fontSize: '20px',
    paddingLeft: '0.5rem',
    height: '2.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
  },
  '& .p-autocomplete-panel': {
    marginTop: '0.2rem',
    width: '100%',
    borderRadius: '0.5rem',
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
  },
  '& .p-autocomplete-item': {
    padding: '8px',
    fontSize: '16px',
    borderBottom: '1px solid #ccc',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      fontWeight: 'bold',
    }
  },
})
