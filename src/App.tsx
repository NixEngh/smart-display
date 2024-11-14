import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Timetable } from "./components/timetable.tsx";
import { WashingWeek } from "./components/washing-week.tsx";
import { WeatherTable } from "./components/weather-table.tsx";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-2 grid-rows-6 bg-primary h-screen gap-4 p-4">
        <div className="row-start-1 row-span-3 rounded-lg outline outline-black">
          <Timetable stop="dplass" type="tram" />
        </div>
        <div className="row-start-4 row-span-3 rounded-lg outline outline-black">
          <Timetable stop="blekenberg" />
        </div>
        <div className="row-start-1 row-span-4 rounded-lg outline outline-black">
          <WeatherTable />
        </div>
        <div className="row-start-5 row-span-2 rounded-lg outline outline-black">
          <WashingWeek />
        </div>
      </div>
    </QueryClientProvider>
  );
}
