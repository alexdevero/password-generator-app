import React from 'react'
import styled from 'styled-components'

import Checkbox from './Checkbox'
import Input from './Input'
import SettingsOptionWrapper from './SettingsOption'

const BasicSettingsWrapper = styled.div`
  padding-bottom: 16px;
`

const BasicSettings = ({ clickHandler, clickInputHandler, state }) => {
  return(
    <BasicSettingsWrapper>
      <SettingsOptionWrapper onClick={clickHandler}>
        <Checkbox id="settingsLower" isChecked={state.settingsLower} label="Lowercase" hint="abcdefghijklmnopqrstuvwxyz" />
      </SettingsOptionWrapper>

      <SettingsOptionWrapper onClick={clickHandler}>
        <Checkbox id="settingsUpper" isChecked={state.settingsUpper} label="Uppercase" hint="ABCDEFGHIJKLMNOPQRSTUVWXYZ" />
      </SettingsOptionWrapper>

      <SettingsOptionWrapper onClick={clickHandler}>
        <Checkbox id="settingsNumbers" isChecked={state.settingsNumbers} label="Numbers" hint="0123456789" />
      </SettingsOptionWrapper>

      <SettingsOptionWrapper onClick={clickHandler}>
        <Checkbox id="settingsAsci" isChecked={state.settingsAsci} label="ASCII symbols" hint={"!" + "\"" + "#$%&'()*+,-./:;<=>?@[\]^_`{|}~"} />
      </SettingsOptionWrapper>

      <SettingsOptionWrapper onClick={clickHandler}>
        <Checkbox id="settingsSpace" isChecked={state.settingsSpace} label="Space" hint=" " />
      </SettingsOptionWrapper>

      <SettingsOptionWrapper>
        <Input id="settingsLength" inputValue={state.settingsLength} label="Length" type="number" clickHandler={clickInputHandler} />
      </SettingsOptionWrapper>
    </BasicSettingsWrapper>
  )
}

export default BasicSettings
