// getDayIndex
export const getDayIndex = (date, daysShift) => (date.getDay() + daysShift) % 7;
