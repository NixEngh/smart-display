import { differenceInWeeks } from "date-fns";

import { FaKitchenSet } from "react-icons/fa6";
import { GiVacuumCleaner } from "react-icons/gi";
import { LiaToiletSolid } from "react-icons/lia";

export function WashingWeek() {
  const order = ["Snorre", "Erling", "Nikolaus"];
  const initial = new Date("2024-11-11");
  const kitchenIndex = differenceInWeeks(new Date(), initial) % 3;
  const bathroomIndex = (differenceInWeeks(new Date(), initial) + 1) % 3;
  const floorIndex = (differenceInWeeks(new Date(), initial) + 2) % 3;

  return (
    <div className="flex flex-col items-center bg-slate-950 font-sans h-full justify-center text-primary-foreground">
      <h1 className="text-2xl">Vask:</h1>
      <div className="grid grid-cols-3 grid-rows-2 gap-px bg-slate-400">
        <div className="bg-slate-950 flex justify-center">
          <FaKitchenSet size={32} />
        </div>
        <div className="bg-slate-950 flex justify-center">
          <GiVacuumCleaner size={32} />
        </div>
        <div className="bg-slate-950 flex justify-center">
          <LiaToiletSolid size={32} />
        </div>

        <h2 className="text-4xl bg-slate-950 p-2 text-center">
          {order[kitchenIndex]}
        </h2>
        <h2 className="text-4xl bg-slate-950 p-2 text-center">
          {order[bathroomIndex]}
        </h2>
        <h2 className="text-4xl bg-slate-950 p-2 text-center">
          {order[floorIndex]}
        </h2>
      </div>
    </div>
  );
}
