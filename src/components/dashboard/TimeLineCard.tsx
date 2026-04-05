import {
  Camera,
  Pencil,
  PictureInPicture,
  Coffee,
  Heart,
  MapPin,
  Music,
  Star,
  Utensils,
} from "lucide-react";
import Card from "../base/Card";
import type { Timeline } from "@/types";

const iconMap: any = {
  heart: Heart,
  coffee: Coffee,
  utensils: Utensils,
  mappin: MapPin,
  music: Music,
  star: Star,
  camera: Camera,
};

interface Props {
  moment: Timeline;
}

const formatDate = (date: any) => {
  if (date?.toDate) {
    return date.toDate().toLocaleDateString();
  }
  return new Date(date).toLocaleDateString();
};



function TimeLineCard({ moment }: Props) {
  console.log(moment, 'mommenn');
  
  const Icon =
    moment?.icon && iconMap[moment.icon] ? iconMap[moment.icon] : Heart;

  return (
    <div className="flex sm:gap-6 gap-3 w-full">
      <div className="flex  relative  flex-col items-center">
        <span
          className={`rounded-full size-12 flex items-center justify-center bg-primary text-white`}
        >
          <Icon size={20} />{" "}
        </span>
        <div data-aos="fade-down" data-aos-delay={200}>
          <span className="w-0.5 absolute h-50 bg-accent  "></span>
        </div>
      </div>
      <div data-aos="fade-left" className="w-full" data-aos-delay={200}>
        <Card className="  space-y-2   ">
          <div className="flex justify-between">
            <span>
              <p className="font-medium sm:text-base text-sm ">
                {moment.title}
              </p>
              <p className="text-xs text-text ">{formatDate(moment.date)}</p>
            </span>{" "}
            <Pencil size={16} className="text-primary" />
          </div>
          <p className="text-text sm:text-sm text-xs">{moment.note}</p>

          <div className="flex gap-2">
            <span
              className={`rounded-md size-12 overflow-hidden  bg-gray-100`}
            >
              {moment?.photos && (
                <img src={moment?.photos} alt="Timeline Photo" className="w-full h-full object-cover" />
              )}
              <PictureInPicture size={20} />
            </span>
            <span
              className={`rounded-md size-12 flex items-center justify-center bg-gray-100 border-dotted border-2`}
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
