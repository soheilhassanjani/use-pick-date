import { useState, useEffect } from "react";
import Jalaali, { toGregorian, toJalaali } from "jalaali-js";
import locals from "@/configs/locals";

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

function subtractDaysFromDate(date, count) {
  const today = date;
  return new Date(today.setDate(today.getDate() - count));
}

function nextDaysFromDate(date, count) {
  const today = date;
  return new Date(today.setDate(today.getDate() + count));
}

const useJalaliCalendar = (local, year) => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const months = [];

    for (let i = 1; i <= 12; i++) {
      //
      const x = locals?.[local];
      // Calculate the number of days in the Jalali month.
      // const daysInMonth = Jalaali.jalaaliMonthLength(jalaliYear, i);
      const daysInMonth = x.getMonthLength(year, i);
      // Create an object representing the Jalali month and its days.
      const month = {
        name: x.monthNames[i - 1],
        days: daysInMonth,
        weeks: sliceArrayIntoChunks(
          [
            ...Array.from({
              length: x.getDayIndex(year, i, 1),
            }).map((_, index, arr) => {
              const gregorianDate = toGregorian(year, i, 1);
              const date = new Date(
                gregorianDate.gy,
                gregorianDate.gm - 1,
                gregorianDate.gd
              );
              return {
                day: toJalaali(subtractDaysFromDate(date, arr.length - index))
                  .jd,
                prevMonth: true,
              };
            }),
            //
            ...Array.from({
              length: daysInMonth,
            }).map((_, i) => ({
              day: i + 1,
            })),
            //
            ...Array.from({
              length:
                (7 -
                  findFirstDayOfWeekJalali(
                    i + 1 === 13 ? year + 1 : year,
                    i + 1 === 13 ? 1 : i + 1,
                    1
                  )) %
                7,
            }).map((_, index) => {
              const gregorianDate = toGregorian(
                i + 1 === 13 ? year + 1 : year,
                i + 1 === 13 ? 1 : i + 1,
                1
              );
              const date = new Date(
                gregorianDate.gy,
                gregorianDate.gm - 1,
                gregorianDate.gd
              );
              return {
                day: toJalaali(nextDaysFromDate(date, index)).jd,
                prevMonth: true,
              };
            }),
          ],
          7
        ),
      };

      months.push(month);
    }

    setMonths(months);
  }, [local, year]);
  return { months };
};

export default useJalaliCalendar;
