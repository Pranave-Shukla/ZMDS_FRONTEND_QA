export const cn = (...classnames: (boolean | string | undefined)[]): string =>
  classnames
    .filter((style: boolean | string | undefined) => style && typeof style === 'string')
    .join(' ')
    .trim()
