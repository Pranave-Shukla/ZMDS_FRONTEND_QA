import React from 'react'

import styles from './DetailsButtons.module.scss'
import { DETAILS_BUTTONS_LABELS } from './constants'

export const DetailsButtons = ({
  additionalClassName,
  saveAction,
}: {
  additionalClassName: string
  saveAction: () => void
}) => (
  <div className={`${additionalClassName} ${styles.controlButtons}`}>
    <button className="btn btn-danger" onClick={() => history.back()}>
      {DETAILS_BUTTONS_LABELS.ABORT}
    </button>
    <button className="btn btn-success" onClick={() => saveAction()}>
      {DETAILS_BUTTONS_LABELS.SAVE}
    </button>
  </div>
)
