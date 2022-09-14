export type BarLoaderState = {
  loading: boolean
  loadingInternal: boolean
  loadingListener?: (isLoading: boolean) => void
  registerListener: (listener: (isLoading: boolean) => void) => void
}
