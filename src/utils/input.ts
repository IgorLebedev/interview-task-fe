export const formatInputNumber = (inputValue: string) => {
  let value = inputValue;
  // Replace commas with dots
  value = value.replace(/,/g, '.');

  // Remove all characters except digits and dots
  value = value.replace(/[^0-9.]/g, '');

  // Ensure that there is only one dot
  const parts = value.split('.');
  if (parts.length > 2) {
    value = `${parts[0]}.${parts.slice(1).join('')}`;
  }

  // Add leading zero when input starts with dot.
  if (value.startsWith('.')) {
    value = `0${value}`;
  }

  // Remove leading zero if the next character is not a dot
  if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
    value = value.substring(1);
  }

  return value;
};
