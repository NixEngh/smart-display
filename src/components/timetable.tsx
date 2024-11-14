import {
  EstimatedCall,
  stopnames,
  useUpcomingDepartures,
} from "../hooks/use-upcoming-departures.tsx";
import {
  extractRouteNumber,
  formatTime,
  getTimeDifferenceInMinutes,
} from "../utils/timetableutils.tsx";
import { FaTrainSubway } from "react-icons/fa6";
import { IoBus } from "react-icons/io5";

export function Timetable({
  stop,
  type = "all",
}: {
  stop: stopnames;
  type?: "all" | "tram" | "bus";
}) {
  const { data, isLoading, isError, error } = useUpcomingDepartures(5000, stop);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const calls = data.stopPlace.estimatedCalls;

  return (
    <div className="flex flex-col text-primary-foreground bg-slate-950 p-2 w-full h-full overflow-scroll-y">
      <h1 className="p-1 font-semibold text-3xl">{data.stopPlace.name}</h1>

      <table className="text-left w-full">
        <thead className="border-b">
          <tr>
            <th className="p-2">
              <p className="font-semibold">Linje</p>
            </th>
            <th className="pb-2"></th>
            <th className="pb-2">
              <p className="font-semibold">Avgang</p>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {calls
            .filter((call: EstimatedCall) => {
              const checkTimeDifference =
                getTimeDifferenceInMinutes(call.expectedArrivalTime) >= 0;

              const lineNumber = extractRouteNumber(
                call.serviceJourney.journeyPattern.line.id,
              );

              const checkType =
                type === "all" ||
                (type === "tram" && lineNumber === "1") ||
                (type === "bus" && lineNumber !== "1");

              return checkTimeDifference && checkType;
            })
            .slice(0, 10)
            .map((call: EstimatedCall) => {
              const timeDifference = getTimeDifferenceInMinutes(
                call.expectedArrivalTime,
              );

              const displayTime =
                timeDifference < 15 ||
                call.expectedArrivalTime !== call.aimedArrivalTime
                  ? `${timeDifference} min`
                  : formatTime(call.expectedArrivalTime);

              const routeID = extractRouteNumber(
                call.serviceJourney.journeyPattern.line.id,
              );

              const uniqueKey = `${call.expectedArrivalTime}-${routeID}-${call.destinationDisplay.frontText}`;

              return (
                <tr key={uniqueKey} className="h-10">
                  <td className="p-2 w-32">
                    <div className="flex items-center gap-2 bg-blue-500 w-min rounded-md font-bold py-2 pl-2 pr-4  text-primary">
                      <span>{routeID}</span>
                      {routeID === "1" ? <FaTrainSubway /> : <IoBus />}
                    </div>
                  </td>
                  <td>{call.destinationDisplay.frontText}</td>
                  <td>{displayTime}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
