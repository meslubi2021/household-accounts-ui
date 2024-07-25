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