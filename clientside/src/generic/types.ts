export type ValuesOf<T> = T[keyof T]

export type ObjectOfKeysOf<T extends { [key in keyof T]: ValuesOf<T> }, U = string> = {
  [key in ValuesOf<T>]: U
}

export type ArrayOfValuesOf<T extends { [key in keyof T]: ValuesOf<T> }> = ValuesOf<T>[]

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type DateType = Date | { readonly cachedValue: any; readonly value: any }
