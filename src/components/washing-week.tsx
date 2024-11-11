import { differenceInWeeks } from "date-fns";

export function WashingWeek() {
  const order = ["Snorre", "Erling", "Nikolaus"];
  const initial = new Date("2024-11-11");
  const index = differenceInWeeks(new Date(), initial) % 3;

  return (
    <div className="flex flex-col items-center bg-slate-950 font-sans h-full justify-center text-primary-foreground">
      <h1 className="text-2xl">Vaskeuke:</h1>
      <h2 className="text-4xl">{order[index]}</h2>
    </div>
  );
}
