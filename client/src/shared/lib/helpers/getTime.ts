export const getTime = (timeString: Date) => {
    const sentAt = new Date(timeString);
    return `${sentAt.getHours().toString().padStart(2, "0")}:${sentAt
        .getMinutes()
        .toString()
        .padEnd(2, "0")}`;
};
