import { DAYS_SHIFT_FOR_JALALI, JALALI_MONTH_NAMES } from "@/constant/constant";
import { getDayIndex } from "@/utils/date";
import { jalaaliMonthLength } from "jalaali-js";

const faIR = {
  monthNames: JALALI_MONTH_NAMES,
  getDayIndex: (d) => getDayIndex(d, DAYS_SHIFT_FOR_JALALI),
  getMonthLength: jalaaliMonthLength,
};

export default faIR;
