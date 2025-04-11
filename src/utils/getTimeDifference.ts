import moment from 'moment';

/**
 * @param {string} createdAt - The ISO string timestamp from the data.
 * @returns {string} 
 */
const getTimeDifference = (createdAt: string): string => {
  const now = moment();
  const createdAtMoment = moment(createdAt);

  const differenceInMinutes = now.diff(createdAtMoment, 'minutes');
  const differenceInHours = now.diff(createdAtMoment, 'hours');
  const differenceInDays = now.diff(createdAtMoment, 'days');
  if (differenceInDays > 0) {
    if (differenceInDays === 1) {
      return 'Added yesterday';
    } else {
      return `Added ${differenceInDays} days ago`;
    }
  } else if (differenceInHours > 0) {
    return `Added ${differenceInHours} hours ago`;
  } else if (differenceInMinutes > 0) {
    return `Added ${differenceInMinutes} minutes ago`;
  } else {
    return 'Added just now';
  }
};

export default getTimeDifference;
