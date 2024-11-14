import { useQuery } from "@tanstack/react-query";

export type StopPlace = {
  id: string;
  name: string;
  estimatedCalls: EstimatedCall[];
};

export type EstimatedCall = {
  realtime: boolean;
  aimedArrivalTime: string;
  aimedDepartureTime: string;
  expectedArrivalTime: string;
  expectedDepartureTime: string;
  destinationDisplay: {
    frontText: string;
  };
  quay: {
    id: string;
  };
  serviceJourney: {
    journeyPattern: {
      line: {
        id: string;
      };
    };
  };
};

type Data = {
  stopPlace: StopPlace;
};

const stops = {
  blekenberg: "NSR:StopPlace:29725",
  dplass: "NSR:StopPlace:61380",
};

export type stopnames = keyof typeof stops;

const fetchUpcomingDepartures = (stop_id: string) => {
  return async (): Promise<Data> => {
    const query = `
  {
    stopPlace(id: "${stop_id}") {
      id
      name
      estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {
        realtime
        aimedArrivalTime
        aimedDepartureTime
        expectedArrivalTime
        expectedDepartureTime
        destinationDisplay {
          frontText
        }
        quay {
          id
        }
        serviceJourney {
          journeyPattern {
            line {
              id
            }
          }
        }
      }
    }
  }`;

    const response = await fetch(
      "https://api.entur.io/journey-planner/v3/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ET-Client-Name": "nikolaus-smart-screen",
        },
        body: JSON.stringify({ query }),
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result.data;
  };
};

export const useUpcomingDepartures = (
  interval: number = 5000,
  stop: stopnames,
) => {
  return useQuery<Data, Error>({
    queryKey: [`upcomingDepartures_${stop}`],
    queryFn: fetchUpcomingDepartures(stops[stop]),
    refetchInterval: interval,
  });
};
