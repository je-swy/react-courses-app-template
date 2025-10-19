// this helper function converts course duration from minutes to "HH:MM hour(s)" format

export const getCourseDuration = (minutes: number): string => {
  if (isNaN(minutes) || minutes < 0) return '00:00 hours'; // handle invalid input
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMins = mins.toString().padStart(2, '0');

  // determine correct pluralization for "hour"
  const hourText = hours === 1 ? 'hour' : 'hours';

  return `${formattedHours}:${formattedMins} ${hourText}`;
};