import React from 'react'
import styled from 'styled-components'

const LabelEl = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    font-size: 15px;
    color: hsl(208.9, 11.9%, 50%);
  }

  span + input {
    margin-top: 6px;
  }

  input {
    padding: 4px;
    height: 16px;
    border: 2px solid hsl(208.9, 11.9%, 80%);
    border-radius: 3px;
  }
`

const Input = ({id, label, clickHandler, type, inputValue}) => {
  return(
    <LabelEl htmlFor={id} className="label">

      <span>{label}</span>

      <input id={id} name={id} type={type} defaultValue={inputValue} onChange={clickHandler} />
    </LabelEl>
  )
}

export default Input
