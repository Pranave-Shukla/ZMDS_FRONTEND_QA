import React from 'react'

import { InputProps } from './Input.types'
import styles from './Input.module.scss'

const Input = ({
  disabled = true,
  textContent,
  inputValue = textContent,
  isDigits = false,
  setInputValue = (e) => e,
  title,
}: InputProps) => (
  <div className={styles.InputContainer}>
    <div className={styles.LabelWrapper}>
      <h3 className={styles.Label}>{title}</h3>
    </div>
    <div className={styles.InputWrapper}>
      <input
        className="form-control"
        disabled={disabled}
        onChange={(e) => setInputValue(e.target.validity.valid ? e.target.value : inputValue)}
        pattern={isDigits ? '[0-9]*' : '.*'}
        type="text"
        value={inputValue}
      />
    </div>
  </div>
)

export { Input }
