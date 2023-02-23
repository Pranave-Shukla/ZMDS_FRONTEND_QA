import { ReactNode } from 'react'

import { ValuesOf } from 'generic/types'

interface BackgroundColors {
  BACKGROUND_COLOR_DARK_BLUE: 'flexItemBgColorDarkBlue'
  BACKGROUND_COLOR_DARK_GREY: 'flexItemBgColorDarkGrey'
  BACKGROUND_COLOR_DARK_RED: 'flexItemBgColorDarkRed'
  BACKGROUND_COLOR_WHITE: 'flexItemBgColorWhite'
  BACKGROUND_COLOR_ZOOETIS_DARK_GRAY: 'flexItemBgColorZooetisDarkGray'
  BACKGROUND_COLOR_ZOOETIS_LOGO_ORANGE: 'flexItemBgColorZooetisLogoOrange'
}

export interface ItemProps {
  readonly alignCenter?: boolean
  readonly basis?: string
  readonly bgColor?: ValuesOf<BackgroundColors>
  readonly cSpacing?: string
  readonly children: ReactNode
  readonly justifyCenter?: boolean
  readonly justifyEnd?: boolean
  readonly noGrow?: boolean
  readonly noShrink?: boolean
  readonly padding?: string
  readonly rounded?: boolean
  readonly spacing?: string
  readonly special_maxWidth?: string
}
