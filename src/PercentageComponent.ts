const formatter = new Intl.NumberFormat(undefined, {
  localeMatcher: 'best fit',
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

/**
 * Render percentage number
 */
export const PercentageComponent = (
  value: number
): string => formatter.format(value / 100);
