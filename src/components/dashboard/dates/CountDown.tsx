import Card from "@/components/base/Card";

function CountDown() {
  const time = [
    { value: 2, label: "Days" },
    { value: 13, label: "Hours" },
    { value: 52, label: "Mins" },
    { value: 52, label: "Sec" },
  ];

  return (
    <Card className="bg-primary! space-y-4">
      <p className="text-sm text-card">Countdown</p>

      <div className="grid grid-cols-4 sm:gap-6 gap-2 text-white">
        {time.map((item, i) => (
          <span
            key={i}
            className="bg-accent/30 p-3 rounded-md text-center"
          >
            <p className="font-semibold">{item.value}</p>
            <p className="sm:text-base text-sm">{item.label}</p>
          </span>
        ))}
      </div>
    </Card>
  );
}

export default CountDown;