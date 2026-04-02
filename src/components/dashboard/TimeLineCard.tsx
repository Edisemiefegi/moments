import { Camera, PictureInPicture, User } from "lucide-react";
import Card from "../base/Card";

type Moment = {
  title: string;
  date: string;
  text: string;
};
interface Props {
  index: number;
  moment: Moment;
}

function TimeLineCard({ index, moment }: Props) {
  return (
    <div className="flex sm:gap-6 gap-3 w-full">
      <div className="flex  relative flex-col items-center">
        <span
          className={`rounded-full size-12 flex items-center justify-center bg-gray-100`}
        >
          <User size={20} className="text-text" />
        </span>
        <div data-aos="fade-down" data-aos-delay={index * 200}>
          <span className="w-0.5 absolute -top-1 h-40 bg-accent  "></span>
        </div>
      </div>
      <div data-aos="fade-left" className="w-full" data-aos-delay={index * 200}>
        <Card key={index} className="  space-y-4   ">
          <div>
            <p className="font-medium sm:text-base text-sm ">{moment.title}</p>
            <p className="text-xs text-text ">{moment.date}</p>
          </div>
          <p className="text-text sm:text-sm text-xs">{moment.text}</p>

          <div className="flex gap-2">
            <span
              className={`rounded-full size-12 flex items-center justify-center bg-gray-100`}
            >
              <PictureInPicture size={20} />
            </span>
            <span
              className={`rounded-full size-12 flex items-center justify-center bg-gray-100 border-dotted border-2`}
            >
              <Camera size={20} />
            </span>
          </div>
        </Card>
      </div>{" "}
    </div>
  );
}

export default TimeLineCard;
