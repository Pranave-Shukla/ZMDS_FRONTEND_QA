import React from 'react'
import {
  BooleanValue,
  DictionariesResponse,
  ProductAvailability,
  ProductDetailsResponse,
} from 'sdk'

export interface ProductDetailsComponentProps {
  readonly availability?: ProductAvailability
  readonly context?: string
  readonly dictionariesData: DictionariesResponse
  readonly handleInputFileChange: any
  readonly inputList?: string[]
  readonly isVisible?: BooleanValue
  readonly maxOrder?: number
  readonly minOrder?: number
  readonly productData?: ProductDetailsResponse
  readonly removeInputFile: () => void
  readonly selectedFileName?: string
  readonly setAvailability: React.Dispatch<React.SetStateAction<ProductAvailability | undefined>>
  readonly setContext: React.Dispatch<React.SetStateAction<string | undefined>>
  readonly setInputList: React.Dispatch<React.SetStateAction<string[]>>
  readonly setMaxOrder: React.Dispatch<React.SetStateAction<number>>
  readonly setMinOrder: React.Dispatch<React.SetStateAction<number>>
  readonly setVisibility: React.Dispatch<React.SetStateAction<BooleanValue | undefined>>
  readonly updateProductDetails: () => void
}

export interface ProductDetailsProps {
  readonly match: any
}

export interface Event<T = EventTarget> {
  target: T
}
