import React from 'react'
import styled from 'styled-components'

import Input from './Input'
import SettingsOptionWrapper from './SettingsOption'

const AdvancedSettingsWrapper = styled.div`
  padding-bottom: 16px;
`

const AdvancedSettings = ({ clickHandler, state }) => {
  return(
    <AdvancedSettingsWrapper>
      <SettingsOptionWrapper>
        <Input id="settingsCustom" label="Custom characters" type="text" clickHandler={clickHandler} inputValue={state.settingsCustom} />
      </SettingsOptionWrapper>

      <SettingsOptionWrapper>
        <Input id="settingsEntropy" label="Entropy" type="number" clickHandler={clickHandler} inputValue={state.settingsEntropy} />
      </SettingsOptionWrapper>
    </AdvancedSettingsWrapper>
  )
}

export default AdvancedSettings
