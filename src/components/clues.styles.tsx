import { styled } from "@stitches/react"
import { Button as ButtonPrimeReact } from "primereact/button";

export const Button = styled(ButtonPrimeReact, {

  padding: '8px 12px',
  margin: '4px',
  fontSize: '20px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: 'rgb(30, 41, 59)',


  '&.past': {
    backgroundColor: 'red',
    color: 'white',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },


  '&.currentGuessed': {
    backgroundColor: 'rgb(5, 150, 105)',
  },

  '&.skip': {
    backgroundColor: '#059669',
  },

  '&.current': {
    fontWeight: '900',
  },
  
});