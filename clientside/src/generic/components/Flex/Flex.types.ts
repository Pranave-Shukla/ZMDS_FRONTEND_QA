import { ReactNode } from 'react'

import { ValuesOf } from 'generic/types'

interface Borders {
  BOTTOM_RIGHT_SOLID_SILVER: 'flexBorderBottomRightSolidSilver'
  BOTTOM_SOLID_SILVER: 'flexBorderBottomSolidSilver'
  SOLID_RED: 'flexBorderSolidRed'
}

export interface FlexProps {
  readonly alignItemsEnd?: boolean
  readonly alignItemsStart?: boolean
  readonly basis?: string
  readonly border?: ValuesOf<Borders>
  readonly cSpacing?: string
  readonly children: ReactNode
  readonly column?: boolean
  readonly justifyCenter?: boolean
  readonly justifyEnd?: boolean
  readonly justifySpaceBetween?: boolean
  readonly justifySpaceEvenly?: boolean
  readonly noGrow?: boolean
  readonly noShrink?: boolean
  readonly spacing?: string
  readonly wrap?: boolean
}
