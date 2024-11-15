import { useEffect, useState } from "react";

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => any) | null;
  onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
}

interface NavigatorWithBattery extends Navigator {
  getBattery: () => Promise<BatteryManager>;
}

export const UtilityChip = () => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    (navigator as NavigatorWithBattery)
      .getBattery()
      .then((battery: BatteryManager) => {
        setBattery(battery.level * 100);
        battery.addEventListener("levelchange", () => {
          setBattery(battery.level * 100);
        });
      });

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-blue-400 text-white flex flex-col items-center justify-center">
      <div className="text-lg font-semibold">{formatTime(time)}</div>
      {battery !== null && (
        <div className="mt-2 text-sm">{battery.toFixed(0)}%</div>
      )}
    </div>
  );
};
