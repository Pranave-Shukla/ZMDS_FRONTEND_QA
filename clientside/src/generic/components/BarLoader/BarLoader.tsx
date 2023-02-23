import React, { useState } from 'react'

import { BarLoaderState } from './BarLoaderState'
import styles from './BarLoader.module.scss'

const BarLoader = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false)

  BarLoaderState.registerListener((isLoading) => {
    setIsLoading(isLoading)
  })

  return (
    <span
      className={styles.barLoaderWrapper}
      id={id}
      style={{ display: isLoading ? 'block' : 'none' }}
    >
      <span className={styles.barLoaderA}></span>
      <span className={styles.barLoaderB}></span>
    </span>
  )
}

export { BarLoader, BarLoaderState }
