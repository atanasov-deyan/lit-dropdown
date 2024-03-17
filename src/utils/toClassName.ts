type ClassNames = Array<string | undefined | false>

export const toClassName = (classNames: ClassNames): string => classNames
  .filter(Boolean)
  .join(' ')
  .replace(/\s+/g, ' ')
  .trim()
