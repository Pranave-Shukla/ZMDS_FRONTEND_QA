import { BarLoaderState } from './BarLoader.types'

const BarLoaderState: BarLoaderState = {
  get loading() {
    return this.loadingInternal
  },
  set loading(isLoading) {
    this.loadingInternal = isLoading
    if (this.loadingListener) {
      this.loadingListener(isLoading)
    }
  },
  loadingInternal: false,
  registerListener: function (listener) {
    this.loadingListener = listener
  },
}

export { BarLoaderState }
