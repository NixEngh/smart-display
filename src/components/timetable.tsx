type Props = {
  stop: "dplass" | "blekenberg";
};

export function TimeTable({ stop }: Props) {
  return (
    <div className="w-full h-full bg-slate-950">
      <h1>{stop}</h1>
    </div>
  );
}
