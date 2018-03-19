import React from 'react'
import styled, { injectGlobal } from 'styled-components'

import AdvancedSettings from './components/AdvancedSettings'
import BasicSettings from './components/BasicSettings'
import { Button, ButtonWrapper } from './components/Button'
import Info from './components/Info'
import Navigation from './components/Navigation'

// Import dialog module for error notification
const dialog = require('electron').remote.dialog

injectGlobal`
  body {
    margin: 0;
    font: caption; /* Automatically pick whatever font is the UI font on a system */
    line-height: 1.414;
    color: #333;
  }

  h1,
  label {
    -webkit-user-select: none;
    cursor: default;
  }

  h1 {
    margin-top: 0;
    font-size: 24px;
  }
`

const AppWrapper = styled.div`
  padding-right: 16px;
  padding-left: 16px;
`

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      settingsAsci: false,
      settingsCustom: '',
      settingsEntropy: 0,
      settingsLength: 0,
      settingsLower: false,
      settingsNumbers: false,
      settingsSpace: false,
      settingsUpper: false,
      showAdvancedSettings: false,
      showBasicSettings: false,
      showResult: false,
    }
  }

  // Method for Showing Advanced settings screen
  toggleAdvancedSettings() {
    this.setState({
      showAdvancedSettings: !this.state.showAdvancedSettings,
      showBasicSettings: false
    })
  }

  // Method for Showing Basic settings screen
  toggleBasicSettings() {
    this.setState({
      showAdvancedSettings: false,
      showBasicSettings: !this.state.showBasicSettings
    })
  }

  generatePassword() {
    // Check if user chose any option
    if (!this.state.settingsNumbers && !this.state.settingsLower && !this.state.settingsUpper && !this.state.settingsAsci && !this.state.settingsSpace && this.state.settingsCustom.length === 0 && this.state.settingsEntropy === 0) {
      return dialog.showMessageBox({type: 'warning', buttons: ['Close'], message: 'You didn\'t choose any options.'})
    }

    // Check the length of the password
    if (parseInt(this.state.settingsLength) === 0 || parseInt(this.state.settingsLength) < 0 || this.state.settingsLength === '') {
      return dialog.showMessageBox({type: 'warning', buttons: ['Close'], message: 'The password must be longer than 0.'})
    }

    // Variable for set of characters based on user's choice
    let characters = ''

    // Set of characters we will use according to the options
    const charactersSets = [
      [this.state.settingsAsci, '!\'#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'],
      [this.state.settingsCustom.length !== 0, this.state.settingsCustom],
      [this.state.settingsLower, 'abcdefghijklmnopqrstuvwxyz'],
      [this.state.settingsNumbers, '0123456789'],
      [this.state.settingsSpace, ' '],
      [this.state.settingsUpper, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
    ]

    // Variable for the final password
    let password = ''

    // Get all symbols chosen by the user from charactersSets and add them to characters
    charactersSets.map((i) => {
      if (i[0]) characters += i[1]
    })

    // Prepare new array that will not contain any duplicate symbols
    let charactersArray = []

    // Remove duplicate symbols from characters and push them to charactersArray
  	for (let i = 0; i < characters.length; i++) {
  		let c = characters.charCodeAt(i)

  		let s = null

  		if (c < 0xD800 || c >= 0xE000) { // Regular UTF-16 symbols
  			s = characters.charAt(i)
      } else if (0xD800 <= c && c < 0xDC00) { // Uppercase surrogate
  			if (i + 1 < characters.length) {
  				let d = characters.charCodeAt(i + 1)

  				if (0xDC00 <= d && d < 0xE000) {
  					// Valid symbols in supplementary plane
  					s = characters.substr(i, 2)

  					i++
  				}
  			}
      // Else remove unpaired surrogate
  		} else if (0xDC00 <= d && d < 0xE000) { // Lowercase surrogate
  			i++  // Remove unpaired surrogate
      }

  		if (s !== null && charactersArray.indexOf(s) === -1) {
        charactersArray.push(s)
      }
  	}

    // Check if user wants to use entropy and generate a random password
    if (parseInt(this.state.settingsEntropy) !== 0 || parseInt(this.state.settingsEntropy) > 0 || parseInt(this.state.settingsEntropy) && this.state.settingsEntropy !== '') {
      let entropy = Math.ceil(parseInt(this.state.settingsEntropy) * Math.log(2) / Math.log(charactersArray.length))

      for (let i = 0; i < entropy; i++) {
        password += charactersArray[Math.floor(Math.random() * charactersArray.length)]
      }
    } else {
      // Otherwise, use the length chosen by the user and charactersArray to generate a random password that matches
      for (let i = 0; i < this.state.settingsLength; i++) {
        password += charactersArray[Math.floor(Math.random() * charactersArray.length)]
      }
    }

    // Make sure none of the setting screens is open and update the 'password' and 'showResult' keys
    this.setState({
      password: password,
      showAdvancedSettings: false,
      showBasicSettings: false,
      showResult: true
    })
  }

  // Method for Checkbox component
  handleCheckbox(e) {
    e.preventDefault()

    let checkbox = e.currentTarget.querySelector('[type=checkbox]')
    let checkboxId = checkbox.getAttribute('id')

    checkbox.checked = checkbox.checked ? false : true

    this.setState({
      [checkboxId]: !this.state[checkboxId]
    })
  }

  // Method for Input component
  handleInput(e) {
    let inputId = e.currentTarget.getAttribute('id')
    let inputValue = e.currentTarget.value

    this.setState({
      [inputId]: inputValue
    })
  }

  render() {
    return (
      <AppWrapper>
        {/* Main navigation */}
        <Navigation toggleBasicSettings={() => this.toggleBasicSettings()} toggleAdvancedSettings={() => this.toggleAdvancedSettings()} state={this.state} />

        {/* Component with basic settings */}
        {this.state.showBasicSettings && <BasicSettings state={this.state} clickHandler={(e) => this.handleCheckbox(e)} clickInputHandler={(e) => this.handleInput(e)} />}

        {/* Component with advanced settings */}
        {this.state.showAdvancedSettings && <AdvancedSettings state={this.state} clickHandler={(e) => this.handleInput(e)} />}

        {/* Component with welcome message and result - the password generated by our password generator */}
        {!this.state.showBasicSettings && !this.state.showAdvancedSettings && <Info showResult={this.state.showResult} password={this.state.password} />}

        {/* Main control elements - button for generating password and for reseting our password generator */}
        <ButtonWrapper>
          {!this.state.showResult && <Button type="button" onClick={() => this.generatePassword()}>Generate password</Button>}

          {this.state.showResult && <Button type="button" onClick={() => this.generatePassword()}>Generate new password</Button>}
        </ButtonWrapper>
      </AppWrapper>
    )
  }
}

export default App
