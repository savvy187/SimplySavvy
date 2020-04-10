import moment from 'moment';

export default function useApproximateTime(timestamp)  {
    const RANGES = {
        ONE_DAY: moment().subtract(1, 'day'),
        ONE_WEEK: moment().subtract(1, 'week'),
        ONE_MONTH: moment().subtract(1, 'month'),
        ONE_YEAR: moment().subtract(1, 'year')
    };

    if (timestamp.isBetween(RANGES.ONE_DAY)) {        
        return 'about a day ago.';
    } else if (timestamp.isBetween(RANGES.ONE_WEEK)) {
        return 'just this week.';
    } else if (timestamp.isBetween(RANGES.ONE_MONTH)) {
        return 'about a month ago and Still relevant!';
    } else if (timestamp.isBetween(RANGES.ONE_YEAR)) {
        return 'in prehistoric JavaScript times.';
    }

    return '...uh how is this still up here?';    
}
