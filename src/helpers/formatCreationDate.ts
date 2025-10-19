// this helper function formats a date string by replacing slashes with dots

export const formatCreationDate = (dateString: string): string => {
  return dateString.replace(/\//g, '.');
};