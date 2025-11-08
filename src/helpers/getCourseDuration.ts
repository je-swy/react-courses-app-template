// this helper function converts course duration from minutes to "HH:MM hour(s)" format

function getCourseDuration(minutes: number): string {
  if (isNaN(minutes) || minutes < 0) return '00:00 hours';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMins = mins.toString().padStart(2, '0');

  const hourText = hours === 1 ? 'hour' : 'hours';

  return `${formattedHours}:${formattedMins} ${hourText}`;
}

export default getCourseDuration;