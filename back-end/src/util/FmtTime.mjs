export function getCurrentTime() {
    return new Date();
}

export function getElapsedTime(startTime) {
    return new Date(getCurrentTime().getTime() - startTime.getTime());
}

export const getCurrentTimeString = () => getCurrentTime().toISOString();

export function toTimeString(dateObj) {
    return dateObj.toISOString();
}