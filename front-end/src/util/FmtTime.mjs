
export function getCurrentTime() : Date {
    return new Date();
}

export function getElapsedTime(startTime : Date) {
    return new Date(getCurrentTime().getTime() - startTime.getTime());
}

export const getCurrentTimeString = () => getCurrentTime().toISOString();

export function toTimeString(dateObj : Date) {
    return dateObj.toISOString();
}