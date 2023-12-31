import { useState } from "react";
import useJalaliCalendar from "@/hooks/useJalaliCalendar";
import clsx from "clsx";

export default function Home() {
  const [jalaliYear, setJalaliYear] = useState(1402);
  const { months } = useJalaliCalendar("faIR", jalaliYear);
  console.log(months);
  return (
    <div>
      <h1>Jalali Calendar for Year {jalaliYear}</h1>
      <table dir="rtl">
        <thead>
          <tr>
            <th>ش</th>
            <th>ی</th>
            <th>د</th>
            <th>س</th>
            <th>چ</th>
            <th>پ</th>
            <th>ج</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month, index) => (
            <>
              <tr key={index}>
                <td colSpan="7">{month.name}</td>
              </tr>
              {month.weeks.map((week, weekID) => (
                <tr key={weekID}>
                  {week.map((item, dayIndex) => (
                    <td
                      className={clsx("w-8 h-8 text-center", {
                        "text-slate-300": item?.prevMonth,
                      })}
                      key={dayIndex}
                    >
                      {item?.day ?? "."}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
