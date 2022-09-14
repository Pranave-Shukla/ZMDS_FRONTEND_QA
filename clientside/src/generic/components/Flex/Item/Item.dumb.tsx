// import React, { FC, memo } from 'react'

// import { cn } from '../../../utils/className'
// import { ItemProps } from './Item.types'
// import styles from './Item.styles.scss'

// const ItemDumbFC: FC<ItemProps> = ({
//   alignCenter,
//   basis,
//   bgColor,
//   cSpacing,
//   children,
//   justifyCenter,
//   justifyEnd,
//   noGrow,
//   noShrink,
//   padding,
//   rounded,
//   spacing,
//   special_maxWidth,
// }) => (
//   <div
//     className={cn(
//       alignCenter && styles.alignCenter,
//       styles.flex,
//       justifyCenter && styles.justifyCenter,
//       justifyEnd && styles.justifyEnd,
//       bgColor && styles[bgColor],
//       rounded && styles.rounded,
//     )}
//     style={{
//       flex: `${noGrow ? '0' : '1'} ${noShrink ? '0' : '1'} ${basis || 'auto'}`,
//       ...(padding && {
//         padding: padding
//           .split(' ')
//           .map((part) => `${part}px`)
//           .join(' '),
//       }),
//       ...(spacing && { margin: `0 ${parseInt(spacing) / 2}px` }),
//       ...(cSpacing && { margin: `${parseInt(cSpacing) / 2}px 0` }),
//       ...(special_maxWidth && { maxWidth: special_maxWidth }),
//     }}
//   >
//     {children}
//   </div>
// )

// export const Item = memo(ItemDumbFC)
