import { ValuesOf } from 'generic/types'

interface Types {
  readonly ERROR: 'error'
  readonly FIELD_VALUE: 'fieldValue'
}

export interface TextStyles {
  readonly BLUE_12: 'blue12'
  readonly BLUE_13: 'blue13'
  readonly BOLD_10: 'bold10'
  readonly BOLD_12: 'bold12'
  readonly BOLD_14: 'bold14'
  readonly BOLD_16: 'bold16'
  readonly BOLD_GREEN_12: 'boldGreen12'
  readonly BOLD_RED_12: 'boldRed12'
  readonly BOLD_RED_16: 'boldRed16'
  readonly BOLD_WHITE_12: 'boldWhite12'
  readonly BOLD_WHITE_14: 'boldWhite14'
  readonly BOLD_YELLOW_12: 'boldYellow12'
  readonly DARK_16: 'dark16'
  readonly DARK_BOLD_13: 'darkBold13'
  readonly DARK_GRAY_10: 'darkGray10'
  readonly DARK_GRAY_12: 'darkGray12'
  readonly DARK_GRAY_9: 'darkGray9'
  readonly GRAY_12: 'gray12'
  readonly GRAY_14: 'gray14'
  readonly GREEN_12: 'green12'
  readonly ITALIC_GRAY_10: 'italicGray10'
  readonly ITALIC_LIGHT_GRAY_10: 'italicLightGray10'
  readonly LIGHT_GRAY_12: 'lightGray12'
  readonly LIGHT_GRAY_16: 'lightGray16'
  readonly LIGHT_GREEN_12: 'lightGreen12'
  readonly NORMAL_11: 'normal11'
  readonly NORMAL_12: 'normal12'
  readonly NORMAL_13: 'normal13'
  readonly NORMAL_15: 'normal15'
  readonly ORANGE_12: 'orange12'
  readonly RED_10: 'red10'
  readonly RED_12: 'red12'
  readonly RED_16: 'red16'
}

export interface TextProps {
  readonly alignRight?: boolean
  readonly children: string
  readonly hasColon?: boolean
  readonly style?: ValuesOf<TextStyles>
  readonly type?: ValuesOf<Types>
  readonly width?: string
  readonly wrap?: boolean
}
