// this helper function formats a date string by replacing slashes with dots

function formatCreationDate(dateString: string): string {
  if (!dateString) return '';
  return dateString.replace(/\//g, '.');
}

export default formatCreationDate;