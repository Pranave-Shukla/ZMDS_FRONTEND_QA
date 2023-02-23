import React from 'react'

import { Option, SelectProps } from './Select.types'
import styles from './Select.module.scss'

const Select = ({
  defaultValue,
  name,
  options,
  selectedValue = defaultValue,
  setSelectedValue,
  title,
}: SelectProps) => (
  <div className={styles.SelectContainer}>
    <div className={styles.LabelWrapper}>
      <h3 className={styles.Label}>{title}</h3>
    </div>
    <div className={styles.SelectWrapper}>
      <div className="form-group">
        <select
          className="form-select"
          name={name}
          onChange={setSelectedValue}
          value={selectedValue}
        >
          {options
            ? options.map((option: Option, index: number) => (
                <option key={index} label={option.label} value={option.value} />
              ))
            : null}
        </select>
      </div>
    </div>
  </div>
)

export { Select }
