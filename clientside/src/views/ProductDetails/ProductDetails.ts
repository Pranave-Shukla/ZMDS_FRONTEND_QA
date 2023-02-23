import { FC, createElement, memo, useEffect, useState } from 'react'

import {
  DictionariesResponse,
  Language,
  NullableBooleanValue,
  NullableProductAvailability,
  ProductDetailsResponse,
  ProductPartial,
} from 'sdk'

import { dictionaryApi, productsApi } from './api/productsApi'
import { Event, ProductDetailsProps } from './ProductDetails.types'
import { ProductDetailsComponent } from './ProductDetails.component'

const ProductDetailsFC: FC<ProductDetailsProps> = ({ match }) => {
  const [productData, setProductData] = useState<ProductDetailsResponse>({})
  const [dictionariesData, setDictionariesData] = useState<DictionariesResponse>({})
  const [context, setContext] = useState(productData.product?.sourceSystem?.name)
  const [isVisible, setVisibility] = useState(productData.product?.isVisible)
  const [availability, setAvailability] = useState(productData.product?.availability)
  const [inputList, setInputList] = useState<any>([productData.product?.associatedProducts])
  const [minOrder, setMinOrder] = useState<any>(productData.product?.minimumOrderQuantity)
  const [maxOrder, setMaxOrder] = useState<any>(productData.product?.maximumOrderQuantity)
  const [selectedFilePath, setSelectedFilePath] = useState<any>(productData.product?.imageFilepath)
  const [selectedFileName, setSelectedFileName] = useState<any>(productData.product?.imageFilename)

  useEffect(() => {
    productsApi
      .getProductDetails({ id: match.params.productId, statusId: match.params.statusId })
      .then((productDetails) => {
        setProductData(productDetails)
        setContext(productDetails.product?.sourceSystem?.name)
        setInputList(
          productDetails.product?.associatedProducts
            ? productDetails.product?.associatedProducts?.split(',')
            : [''],
        )
        setVisibility(productDetails.product?.isVisible)
        setAvailability(productDetails.product?.availability)
        setMinOrder(
          productDetails.product?.minimumOrderQuantity
            ? productDetails.product?.minimumOrderQuantity
            : '',
        )
        setMaxOrder(
          productDetails.product?.maximumOrderQuantity
            ? productDetails.product?.maximumOrderQuantity
            : '',
        )
        setSelectedFilePath(
          productDetails.product?.imageFilepath ? productDetails.product?.imageFilepath : '',
        )
        setSelectedFileName(
          productDetails.product?.imageFilename ? productDetails.product?.imageFilename : '',
        )
      })
    dictionaryApi
      .getDictionaries({ language: Language.DE })
      .then((dictionaries) => setDictionariesData(dictionaries))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateProductDetails = async () => {
    const productPartial: ProductPartial = {}

    if (inputList.filter(Boolean).join(',') !== productData.product?.associatedProducts) {
      productPartial.associatedProducts = inputList.filter(Boolean).join(',')
        ? inputList.filter(Boolean).join(',')
        : null
    }
    if (availability !== productData.product?.availability) {
      productPartial.availability = availability as unknown as NullableProductAvailability
    }
    if (selectedFilePath !== productData.product?.imageFilepath) {
      productPartial.image = selectedFilePath ? selectedFilePath.split(',')[1] : null
    }
    if (selectedFileName !== productData.product?.imageFilename) {
      productPartial.imageFilename = selectedFileName ? selectedFileName : null
    }
    if (isVisible !== productData.product?.isVisible) {
      productPartial.isVisible = isVisible as unknown as NullableBooleanValue
    }
    if (maxOrder !== productData.product?.maximumOrderQuantity) {
      productPartial.maximumOrderQuantity = maxOrder !== '' ? maxOrder : null
    }
    if (minOrder !== productData.product?.minimumOrderQuantity) {
      productPartial.minimumOrderQuantity = minOrder !== '' ? minOrder : null
    }

    await productsApi.updateProduct({
      applyForAllSystems: context === 'applyToAll',
      id: match.params.productId,
      productPartialRequest: {
        productPartial,
      },
      statusId: match.params.statusId,
    })

    history.back()
  }

  const handleInputFileChange = (event: Event<HTMLInputElement>) => {
    const files = event?.target.files

    if (files && files[0]) {
      const reader = new FileReader()

      reader.readAsDataURL(files[0])

      return (reader.onload = (e) => {
        setSelectedFilePath(e.target?.result)
        setSelectedFileName(files[0].name)
      })
    }

    removeInputFile()
  }

  const removeInputFile = () => {
    setSelectedFilePath('')
    setSelectedFileName('')
  }

  return productData.product?.id && dictionariesData.localizedBooleanValues
    ? createElement(ProductDetailsComponent, {
        availability,
        context,
        dictionariesData,
        handleInputFileChange,
        inputList,
        isVisible,
        maxOrder,
        minOrder,
        productData,
        removeInputFile,
        selectedFileName,
        setAvailability,
        setContext,
        setInputList,
        setMaxOrder,
        setMinOrder,
        setVisibility,
        updateProductDetails,
      })
    : null
}

export const ProductDetails = memo(ProductDetailsFC)
