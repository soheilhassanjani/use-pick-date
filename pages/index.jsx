import { useState } from "react";
import useJalaliCalendar from "@/hooks/useJalaliCalendar";

export default function Home() {
  const [jalaliYear, setJalaliYear] = useState(1402);
  const { months } = useJalaliCalendar(jalaliYear);

  return (
    <div>
      <h1>Jalali Calendar for Year {jalaliYear}</h1>
      <table>
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
              <tr>
                {Array.from({ length: month.days }, (_, dayIndex) => (
                  <td key={dayIndex}>{dayIndex + 1}</td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
