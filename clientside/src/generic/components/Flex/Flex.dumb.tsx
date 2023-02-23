// import React, { FC, memo } from 'react'

// import { cn } from '../../utils/className'
// import { FlexProps } from './Flex.types'
// import styles from './Flex.styles.scss'
// import { Item } from './Item/Item.dumb'

// const FlexDumbFC: FC<FlexProps> = ({
//   alignItemsEnd,
//   alignItemsStart,
//   basis,
//   border,
//   cSpacing,
//   children,
//   column,
//   justifyCenter,
//   justifyEnd,
//   justifySpaceBetween,
//   justifySpaceEvenly,
//   noGrow,
//   noShrink,
//   spacing,
//   wrap,
// }) =>
//   children ? (
//     <div
//       className={cn(
//         styles.flex,
//         column && styles.column,
//         wrap && styles.wrap,
//         alignItemsEnd && styles.alignItemsEnd,
//         alignItemsStart && styles.alignItemsStart,
//         justifyCenter && styles.justifyCenter,
//         justifyEnd && styles.justifyFlexEnd,
//         justifySpaceBetween && styles.justifySpaceBetween,
//         justifySpaceEvenly && styles.justifySpaceEvenly,
//         border && styles[border],
//       )}
//       style={{
//         flex: `${noGrow ? '0' : '1'} ${noShrink ? '0' : '1'} ${basis || 'auto'}`,
//         ...(spacing && { margin: `0 -${parseInt(spacing) / 2}px` }),
//         ...(cSpacing && { margin: `-${parseInt(cSpacing) / 2}px 0` }),
//       }}
//     >
//       {children}
//     </div>
//   ) : null

// export const Flex = Object.assign(memo(FlexDumbFC), {
//   Item,
// })
