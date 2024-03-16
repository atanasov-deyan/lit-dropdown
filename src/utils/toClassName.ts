export const toClassName = (classNames: (string | undefined)[]): string => classNames
  .filter(Boolean)
  .join(' ')
  .replace(/\s+/g, ' ')
  .trim();
