import { Heart, Send } from "lucide-react";
import { Button } from "./ui/button";

function Hero() {
  return (
    <section className="grid  grid-cols-1 md:grid-cols-2 gap-12   ">
      <div className="flex flex-col gap-6  md:text-start md:items-start items-center text-center">
        <p data-aos="fade-in" className="text-primary  text-sm ">
          PLAN . INVITE . REMEMBER
        </p>
        <h1
          data-aos="zoom-in"
          className="font-semibold  lg:text-6xl md:text-4xl text-3xl "
        >
          Create beautiful <span className="text-primary">moments</span>{" "}
          together
        </h1>
        <p data-aos="fade-right" className="text-text">
          Plan thoughtful dates, send interactive invites, and build a timeline
          of your most cherished memories — all in one magical place.
        </p>
        <div data-aos="fade-right" data-aos-delay="100" className="flex gap-4">
          <Button>
            <Heart /> Start Planning
          </Button>
          <Button variant={"outline"}>
            <Send /> Send an Invite
          </Button>
        </div>

        <div data-aos="fade-in" className="flex gap-6">
          <p className="inline-grid text-lg  sm:text-2xl font-semibold">
            10k+{" "}
            <span className="text-xs font-light text-text">Dates Planned</span>
          </p>
          <span className="h-full w-0.5 rounded-full bg-text "></span>
          <p className="inline-grid  text-lg  sm:text-2xl font-semibold">
            5k+{" "}
            <span className="text-xs font-light text-text">Love Lettters</span>
          </p>
          <span className="h-full  w-0.5 rounded-full bg-text "></span>
          <p className="inline-grid  text-lg  sm:text-2xl font-semibold">
            ∞<span className="text-xs font-light text-text">Memories</span>
          </p>
        </div>
      </div>

      <div className=" relative ">
        <span className="bg-card dark:border  transition-transform ease-in-out animate-float-slow  shadow-sm p-4 rounded-full absolute -right-3  md:-right-8 -top-8">
          <p className="text-sm">Next Date 💕</p>
          <p className="text-xs font-thin ">Sunset picnic in 3 days</p>
        </span>
        <img
          className="rounded-xl  w-full h-full object-cover"
          src="/images/hero-illustration.png"
          alt="couples illustration"
        />
        <span className="bg-card dark:border  animate-float-slow shadow-sm p-4 rounded-full absolute md:-left-8 -left-3 -bottom-8">
          <p className="text-sm">Memory saved ✨</p>
          <p className="text-xs font-thin ">First dance at the park</p>
        </span>
      </div>
    </section>
  );
}

export default Hero;
