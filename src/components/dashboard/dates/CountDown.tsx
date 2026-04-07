import { useEffect, useState } from "react";

function CountDown({ targetDate }: { targetDate: string | Date }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();

    const diff = target - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    return { diff, days, hours, mins, secs };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <p className="text-white grid grid-cols-3 items-center text-center text-lg md:text-4xl font-semibold  ">
        <img src="/celebrate.svg" alt="" className="col-span-1 object-cover" />
        <span className="col-span-2">
          You did it!, date schedule completed date
        </span>{" "}
      </p>
    );
  }

  const isLessThan2Days = timeLeft.diff <= 2 * 24 * 60 * 60 * 1000;

  if (!isLessThan2Days) {
    return (
      <p className="text-white grid grid-cols-3 items-center text-center text-lg md:text-4xl font-semibold  ">
        <img
          src="/everywhere-together.svg"
          alt=""
          className="col-span-1 object-cover"
        />
        <span className="col-span-2">
          {timeLeft.days} days left to your amazing date!
        </span>{" "}
      </p>
    );
  }

  const time = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.mins, label: "Mins" },
    { value: timeLeft.secs, label: "Sec" },
  ];

  return (
    <div className="grid grid-cols-4 sm:gap-6 gap-2 text-white">
      {time.map((item, i) => (
        <span key={i} className="bg-accent/20 p-3 rounded-md text-center">
          <p className="font-semibold">{item.value}</p>
          <p className="sm:text-base text-sm">{item.label}</p>
        </span>
      ))}
    </div>
  );
}

export default CountDown;
