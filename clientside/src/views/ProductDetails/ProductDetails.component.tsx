import React, { FC, memo } from 'react'

import styles from './ProductDetails.module.scss'
import { Input } from '../../common/components/Input/Input'
import { Select } from '../../common/components/Select/Select'
import { DetailsButtons } from '../../common/components/DetailsButtons/DetailsButtons'
import { InputList } from './components/InputList'
import { ProductDetailsComponentProps } from './ProductDetails.types'
import { PRODUCT_DETAILS_LABELS } from './constants'

const ProductDetailsComponentFC: FC<ProductDetailsComponentProps> = ({
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
}) => (
  <>
    <h2 className={styles.ProductDetailsHeader}>
      {`${productData?.product?.id} - ${productData?.product?.name}`}
    </h2>
    <Select
      defaultValue={productData?.product?.sourceSystem?.name}
      options={[
        {
          label: PRODUCT_DETAILS_LABELS.APPLY_TO_ALL,
          value: 'applyToAll',
        },
        {
          label: productData?.product?.sourceSystem?.name,
          value: productData?.product?.sourceSystem?.name,
        },
      ]}
      selectedValue={context}
      // setSelectedValue={setContext}
      setSelectedValue={(e) => setContext(e.target.value)}
      title={PRODUCT_DETAILS_LABELS.CONTEXT}
    />
    <div className={styles.ProductDetailsWrapper}>
      <div className={styles.ProductDetails}>
        <div className={styles.ProductDetailsFrame}>
          <Input
            textContent={
              productData?.product?.sourceSystem ? productData.product.sourceSystem.name : ''
            }
            title={PRODUCT_DETAILS_LABELS.SOURCE}
          />
          <Select
            defaultValue={
              productData?.product?.isVisible
                ? dictionariesData.localizedBooleanValues?.find(
                    (localizedBooleanValue) =>
                      localizedBooleanValue.value === productData.product?.isVisible,
                  )?.value
                : undefined
            }
            options={dictionariesData.localizedBooleanValues?.map((localizedBooleanValue) => ({
              label: localizedBooleanValue.localizedValue,
              value: localizedBooleanValue.value,
            }))}
            selectedValue={isVisible}
            setSelectedValue={(e) => setVisibility(e.target.value)}
            title={PRODUCT_DETAILS_LABELS.IS_VISIBLE}
          />
          <Select
            defaultValue={
              productData?.product?.availability
                ? dictionariesData.localizedProductAvailabilities?.find(
                    (localizedProductAvailability) =>
                      localizedProductAvailability.availability ===
                      productData.product?.availability,
                  )?.availability
                : undefined
            }
            options={dictionariesData.localizedProductAvailabilities?.map(
              (localizedProductAvailability) => ({
                label: localizedProductAvailability.localizedAvailability,
                value: localizedProductAvailability.availability,
              }),
            )}
            selectedValue={availability}
            setSelectedValue={(e) => setAvailability(e.target.value)}
            title={PRODUCT_DETAILS_LABELS.AVAILABILITY}
          />
          <Input textContent={productData?.product?.id} title={PRODUCT_DETAILS_LABELS.PRODUCT_ID} />
          <Input textContent={productData?.product?.name} title={PRODUCT_DETAILS_LABELS.NAME} />
          <Input
            textContent={productData?.product?.description}
            title={PRODUCT_DETAILS_LABELS.DESCRIPTION}
          />
          <Input
            textContent={productData?.product?.price}
            title={PRODUCT_DETAILS_LABELS.LIST_PRICE}
          />
          <Input
            disabled={false}
            inputValue={minOrder}
            isDigits={true}
            setInputValue={setMinOrder}
            textContent={productData?.product?.minimumOrderQuantity}
            title={PRODUCT_DETAILS_LABELS.MIN_ORDER}
          />
          <Input
            disabled={false}
            inputValue={maxOrder}
            isDigits={true}
            setInputValue={setMaxOrder}
            textContent={productData?.product?.maximumOrderQuantity}
            title={PRODUCT_DETAILS_LABELS.MAX_ORDER}
          />
          <div className={styles.ProductDetailsRowWithInput}>
            <div className={styles.ProductDetailsTitleWrapper}>
              <h3 className={styles.ProductDetailsTitle}>{PRODUCT_DETAILS_LABELS.PRODUCTS_LIST}</h3>
            </div>
            <div className={styles.ProductDetailsInputWrapper}>
              <InputList inputList={inputList ? inputList : []} setInputList={setInputList} />
            </div>
          </div>
          <div className={styles.ProductDetailsImageInputWrapper}>
            <div className={styles.ProductDetailsRowWithInput}>
              <div className={styles.ProductDetailsTitleWrapper}>
                <label className={styles.ProductDetailsUploadButton} htmlFor="Upload">
                  Image upload
                </label>
                <input
                  accept="image/png, image/jpeg"
                  className={`form-control ${styles.ProductDetailsUploadInput}`}
                  id="Upload"
                  name="upload_file"
                  onChange={handleInputFileChange}
                  type="file"
                />
              </div>
              <div className={styles.ProductDetailsInputWrapper}>
                <input
                  className="form-control"
                  disabled={true}
                  placeholder={PRODUCT_DETAILS_LABELS.IMAGE_NAME}
                  type="text"
                  value={selectedFileName}
                />
                <div
                  className={styles.ProductDetailsRemoveImage}
                  onClick={() => removeInputFile()}
                />
              </div>
            </div>
          </div>
          <DetailsButtons
            additionalClassName={styles.ProductDetailsButtons}
            saveAction={updateProductDetails}
          />
        </div>
      </div>
      {productData?.product?.imageFilepath ? (
        <div className={styles.ProductDetailsImgPreviewWrapper}>
          <div className={styles.ProductDetailsImgPreviewFrame}>
            <img
              alt="Packshot"
              className={styles.ProductDetailsImgPreview}
              src={productData?.product?.imageFilepath}
            />
          </div>
        </div>
      ) : null}
    </div>
  </>
)

export const ProductDetailsComponent = memo(ProductDetailsComponentFC)
