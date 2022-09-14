import React from 'react'

import styles from './LookupRow.module.scss'
import { LookupRowProps } from './LookupRow.types'

const HorizontalArrows = () => (
  <svg viewBox="0 0 349.454 349.454" width={35} x="0px" y="0px">
    <path
      d="M347.258,169.425l-82.373-82.375c-2.929-2.929-7.678-2.929-10.606-0.001l-14.143,14.142c-1.407,1.407-2.197,3.314-2.197,5.304c0,1.989,0.79,3.896,2.196,5.303l45.429,45.43H63.892l45.429-45.428c1.406-1.406,2.196-3.314,2.196-5.303c0-1.989-0.79-3.897-2.196-5.303L95.178,87.05c-2.929-2.928-7.677-2.93-10.607,0L2.196,169.424C0.79,170.83,0,172.738,0,174.727s0.79,3.897,2.196,5.303l82.376,82.375c1.465,1.464,3.385,2.197,5.304,2.197c1.919,0,3.839-0.732,5.304-2.197l14.143-14.143c1.406-1.406,2.196-3.314,2.196-5.303c0-1.989-0.79-3.897-2.196-5.303l-45.43-45.429h221.672l-45.43,45.429c-1.406,1.406-2.196,3.314-2.196,5.303c0,1.989,0.79,3.897,2.196,5.303l14.143,14.143c1.407,1.407,3.314,2.197,5.304,2.197c1.989,0,3.897-0.79,5.304-2.197l82.373-82.374C350.186,177.102,350.186,172.353,347.258,169.425z"
      style={{ fill: '#e9ecef' }}
    />
  </svg>
)

export const LookupRow = ({ children, group = false }: LookupRowProps) => {
  if (!children) return null

  const groupHasAnyValue =
    group &&
    (children[1]?.props?.children[0]?.props.fieldValue ||
      children[1]?.props?.children[1]?.props.fieldValue ||
      children[1]?.props?.children[2]?.props.fieldValue ||
      children[1]?.props?.children[3]?.props.fieldValue)

  const groupStyles = groupHasAnyValue ? styles.CustomerDetailsLookupRowGroup : ''

  return (
    <div className={`${groupStyles}`}>
      {children[0] || children}
      {children[1] && (children[1].props.fieldValue || groupHasAnyValue) ? (
        <>
          <div className={styles.CustomerDetailsLookupArrows}>
            <HorizontalArrows />
          </div>
          {children[1]}
        </>
      ) : null}
    </div>
  )
}
