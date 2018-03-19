import React from 'react'
import styled from 'styled-components'

const LabelEl = styled.label`
  margin-bottom: 0;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;

  & .invisible {
    position: absolute;
    z-index: -1;
    width: 0;
    height: 0;
    opacity: 0;
  }

  & input:checked {
    & + .checkbox {
      border-color: hsl(246.9, 74.3%, 63.3%);

      svg {
        path {
          fill: hsl(246.9, 74.3%, 63.3%);
        }

        polyline {
          stroke-dashoffset: 0;
        }
      }
    }
  }

  &:hover {
    .checkbox {
      svg {
        path {
          stroke-dashoffset: 0
        }
      }
    }
  }

  .checkbox {
    position: relative;
    margin-right: 8px;
    width: 16px;
    height: 16px;
    border: 2px solid hsl(208.9, 11.9%, 80%);
    border-radius: 3px;

    svg {
      position: absolute;
      top: -2px;
      left: -2px;

      path {
        fill: none;
        stroke: hsl(246.9, 74.3%, 63.3%);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 71px;
        stroke-dashoffset: 71px;
        transition: all .6s ease;
      }

      polyline {
        fill: none;
        stroke: #fff;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 18px;
        stroke-dashoffset: 18px;
        transition: all .3s ease;
      }
    }
  }

  & > span {
    vertical-align: middle;
    color: hsl(208.9, 11.9%, 50%);
    font-size: 15px;
    pointer-events: none;
  }

  em {
    font-size: 14px;
  }
`

const Checkbox = ({id, hint, label, isChecked}) => {
  return(
    <LabelEl htmlFor={id}>
      <input id={id} name={id} type="checkbox" className="invisible" defaultChecked={isChecked} />

      <div className="checkbox">
        <svg width="20px" height="20px" viewBox="0 0 20 20">
          <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>

          <polyline points="4 11 8 15 16 6"></polyline>
        </svg>
      </div>

      <span>{label} <em>({hint})</em></span>
    </LabelEl>
  )
}

export default Checkbox
