export const formatCurrency = (value: number | string): string => {
    // Ensure the value is a number
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
  
    if (isNaN(numberValue)) {
      return '';
    }
  
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
  };

export const formatNumber = (value: number | string): string => {
  // Convert the value to a string to handle both integer and decimal parts
  const stringValue = typeof value === 'number' ? value.toString() : value;

  // Split the value into integer and decimal parts
  const [integerPart, decimalPart] = stringValue.split('.');
  // Format the integer part with commas
  const formattedIntegerPart = new Intl.NumberFormat('en-US').format(integerPart === '' ? 0 : parseInt(integerPart));

  // Concatenate the formatted integer part with the decimal part (if exists)
  return decimalPart != null ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};