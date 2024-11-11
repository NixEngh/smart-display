import { TimeTable } from "./components/timetable.tsx";
import { WashingWeek } from "./components/washing-week.tsx";
import { WeatherTable } from "./components/weather-table.tsx";

export default function App() {
  return (
    <div className="grid grid-cols-2 grid-rows-6 bg-primary h-screen gap-4 p-6">
      <div className="row-start-1 row-span-3 rounded-lg outline outline-black">
        <TimeTable stop="dplass" />
      </div>
      <div className="row-start-4 row-span-3 rounded-lg outline outline-black">
        <TimeTable stop="blekenberg" />
      </div>
      <div className="row-start-1 row-span-2 rounded-lg outline outline-black">
        <WashingWeek />
      </div>
      <div className="row-start-3 row-span-4 rounded-lg outline outline-black">
        <WeatherTable />
      </div>
    </div>
  );
}
