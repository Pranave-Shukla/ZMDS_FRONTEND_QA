import React from 'react'

import style from './LookupField.module.scss'
import { LookupFieldProps } from './LookupField.types'

const similarity = (s1, s2) => {
  let longer = s1
  let shorter = s2

  if (s1.length < s2.length) {
    longer = s2
    shorter = s1
  }
  const longerLength = longer.length

  if (longerLength == 0) {
    return 1.0
  }

  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
}

const editDistance = (s1, s2) => {
  s1 = s1.toLowerCase()
  s2 = s2.toLowerCase()

  const costs: number[] = []

  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i

    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j
      else {
        if (j > 0) {
          let newValue = costs[j - 1]

          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
          costs[j - 1] = lastValue
          lastValue = newValue
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }

  return costs[s2.length]
}

export const LookupField = ({ compareTo, fieldValue }: LookupFieldProps) => {
  if (!fieldValue) return null
  if (!compareTo) return <p>{fieldValue}</p>

  const result = (() => {
    if (typeof compareTo === 'string') {
      return similarity(compareTo, fieldValue)
    }
    let result = 0

    compareTo.forEach((el) => {
      if (!el) return 0
      const score = similarity(el, fieldValue)

      if (score > result) {
        result = score
      }
    })

    return result
  })()

  const getColor = (value) => {
    if (value === 1) return 'rgb(149 236 149)'
    const hue = (value * 120).toString(10)

    return ['hsl(', hue, ',70%,90%)'].join('')
  }

  return (
    <div className={style.CustomerDetailsLookupContainer}>
      <p
        className={style.CustomerDetailsLookupField}
        style={{
          backgroundColor: getColor(result),
        }}
      >
        {fieldValue}
      </p>
      {result ? (
        <p className={style.CustomerDetailsLookupMatchRate}>{`${Math.round(result * 100)}%`}</p>
      ) : (
        <p className={style.CustomerDetailsLookupMatchRate}>0%</p>
      )}
    </div>
  )
}
