import { useState, useEffect } from "react";
import Jalaali from "jalaali-js";

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

const useJalaliCalendar = (jalaliYear) => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const jalaliMonths = [];

    for (let i = 1; i <= 12; i++) {
      // Calculate the number of days in the Jalali month.
      const daysInMonth = Jalaali.jalaaliMonthLength(jalaliYear, i);

      // Create an object representing the Jalali month and its days.
      const jalaliMonth = {
        name: monthNames[i - 1],
        days: daysInMonth,
      };

      jalaliMonths.push(jalaliMonth);
    }

    setMonths(jalaliMonths);
  }, [jalaliYear]);
  return { months };
};

export default useJalaliCalendar;
