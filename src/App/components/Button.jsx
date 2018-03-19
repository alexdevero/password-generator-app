import styled from 'styled-components'

import SettingsOptionWrapper from './SettingsOption'

export const Button = styled.button`
  padding: 12px 18px;
  vertical-align: middle;
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  color: #fff;
  background-color: hsl(246.9, 74.3%, 63.3%);
  border: 1px solid transparent;
  border-radius: 35px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: background-color .15s ease-in-out;

  &:hover {
    background-color: hsl(246.9, 74.3%, 53.3%);
  }

  &:active,
  &:focus {
    background-color: hsl(246.9, 74.3%, 43.3%);
    outline: 0;
  }
`

export const ButtonWrapper = SettingsOptionWrapper.extend`
  text-align: center;
`
