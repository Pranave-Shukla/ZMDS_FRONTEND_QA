// import React, { FC, memo } from 'react'

// import { ValuesOf } from 'generic/types'

// import { cn } from '../../utils/className'
// import { TextProps, TextStyles } from './Text.types'
// import styles from './Text.styles.scss'

// const COLON_CHARACTER = ':'

// const DEFAULT_STYLE: ValuesOf<TextStyles> = 'normal12'

// const TextDumbFC: FC<TextProps> = ({
//   children,
//   hasColon,
//   style = DEFAULT_STYLE,
//   type,
//   alignRight,
//   wrap,
//   width,
// }) => (
//   <div
//     className={cn(
//       styles.text,
//       styles[style],
//       type && styles[type],
//       wrap && styles.wrap,
//       alignRight && styles.alignRight,
//     )}
//     style={{ width }}
//   >
//     {children}
//     {hasColon && <span>{COLON_CHARACTER}</span>}
//   </div>
// )

// export const Text = memo(TextDumbFC)
