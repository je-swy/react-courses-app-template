// this helper function formats a date string by replacing slashes with dots

function formatCreationDate(dateString: string): string {
  if (!dateString) return '';
  return dateString.replace(/\//g, '.');
}

export function formatCurrentDate(): string {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // months are zero-indexed
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

export default formatCreationDate;
