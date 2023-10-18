import { useState, useEffect } from "react";
import Jalaali, { toGregorian } from "jalaali-js";

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

function sliceArrayIntoChunks(arr, chunkSize) {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

function findFirstDayOfWeekJalali(jalaliYear, jalaliMonth, jalaliDay) {
  const gregorianDate = toGregorian(jalaliYear, jalaliMonth, jalaliDay);

  const date = new Date(
    gregorianDate.gy,
    gregorianDate.gm - 1,
    gregorianDate.gd
  );
  const dayIndex = date.getDay();

  return (dayIndex + 1) % 7;
}

const useJalaliCalendar = (jalaliYear) => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const jalaliMonths = [];

    for (let i = 1; i <= 12; i++) {
      // Calculate the number of days in the Jalali month.
      const daysInMonth = Jalaali.jalaaliMonthLength(jalaliYear, i);

      console.log(
        monthNames[i - 1],
        findFirstDayOfWeekJalali(jalaliYear, i, 1)
      );
      // Create an object representing the Jalali month and its days.
      const jalaliMonth = {
        name: monthNames[i - 1],
        days: daysInMonth,
        weeks: sliceArrayIntoChunks(
          [
            ...Array.from({
              length: findFirstDayOfWeekJalali(jalaliYear, i, 1),
            }).map(() => ({})),
            ...Array.from({
              length: daysInMonth,
            }).map((_, i) => ({
              day: i + 1,
            })),
          ],
          7
        ),
      };

      jalaliMonths.push(jalaliMonth);
    }

    setMonths(jalaliMonths);
  }, [jalaliYear]);
  return { months };
};

export default useJalaliCalendar;
