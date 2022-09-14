import React from 'react'

import { TextAreaProps } from './TextArea.types'
import customerDetailsStyles from '../CustomerDetails.module.scss'
import styles from './TextArea.module.scss'

export const TextArea = ({
  defaultValue,
  error,
  name,
  setTextAreaValue,
  textAreaValue = defaultValue,
  title,
}: TextAreaProps) => (
  <div className={customerDetailsStyles.CustomerDetailsRowWithInput}>
    <div className={customerDetailsStyles.CustomerDetailsTitleWrapper}>
      <h3 className={customerDetailsStyles.CustomerDetailsTitle}>{title}</h3>
    </div>
    <div className={customerDetailsStyles.CustomerDetailsInputWrapper}>
      <textarea
        className={`form-control ${styles.CustomerDetailsTextArea} ${styles.textarea} ${
          error && styles.error
        }`}
        name={name}
        // @ts-ignore
        onChange={setTextAreaValue}
        rows={6}
        value={textAreaValue}
      />
      <p className={styles.errorMsg}>{error}</p>
    </div>
  </div>
)
