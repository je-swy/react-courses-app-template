// this helper function formats a date string by replacing slashes with dots

export const formatCreationDate = (dateString: string): string => {
  if (!dateString) return ''; // handle empty or undefined input
  return dateString.replace(/\//g, '.');
};