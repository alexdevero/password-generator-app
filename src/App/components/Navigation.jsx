import React from 'react'
import styled, { css } from 'styled-components'

import Link from './Link'

const NavigationWrapper = styled.header`
  margin-bottom: 16px;

  ul {
    margin-top: 0;
    padding: 0;
    display: flex;
    list-style-type: none;
  }

  li {
    padding-bottom: 1px;
    width: 50%;
    text-align: center;
    color: hsl(234.8, 26.4%, 70%);
    border-bottom: 1px solid hsla(234.8, 26.4%, 70%, .2);
    transition: all .25s ease-in-out;

    &:hover,
    &.active {
      padding-bottom: 0;
      color: hsl(246.9, 74.3%, 63.3%);
      border-bottom: 2px solid;
    }

    &:first-of-type {
      border-right: 1px solid hsla(234.8, 26.4%, 70%, .2);
    }
  }
`

const AdvancedSettings = ({ state, toggleBasicSettings, toggleAdvancedSettings }) => {
  return(
    <NavigationWrapper>
      <nav>
        <ul>
          <li className={state.showBasicSettings ? "active" : null}>
            <Link onClick={toggleBasicSettings}>Show basic settings</Link>
          </li>

          <li className={state.showAdvancedSettings ? "active" : null}>
            <Link onClick={toggleAdvancedSettings}>Show advanced settings</Link>
          </li>
        </ul>
      </nav>
    </NavigationWrapper>
  )
}

export default AdvancedSettings
