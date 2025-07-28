export const getTime = (timeString: Date) => {
    const sentAt = new Date(timeString);
    return `${sentAt.getHours()}:${sentAt.getMinutes()}`;
};
