import React, { Dispatch } from 'react'

import styles from './InputList.module.scss'

export const InputList = ({
  inputList,
  setInputList,
}: {
  inputList: string[]
  setInputList: Dispatch<string[]>
}) => {
  const handleInputChange = (value: string, index: number) => {
    const list = [...inputList]

    list[index] = value
    setInputList(list)
  }

  const handleRemoveClick = (index: number) => {
    const list = [...inputList]

    list.splice(index, 1)
    setInputList(list)
  }

  const handleAddClick = () => {
    setInputList([...inputList, ''])
  }

  return (
    <div>
      {inputList.map((value: string, index: number) => (
        <div key={index}>
          <input
            className="form-control"
            onChange={(e) => handleInputChange(e.target.value, index)}
            value={value}
          />
          <div>
            {inputList.length !== 1 && (
              <div className={styles.RemoveIcon} onClick={() => handleRemoveClick(index)} />
            )}
            {inputList.length - 1 === index && (
              <div className={styles.AddIcon} onClick={handleAddClick} />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
