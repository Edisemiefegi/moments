import { Heart } from "lucide-react";
import Feature from "../components/Feature";
import HowItWorks from "../components/HowItWorks";
import TimeLine from "../components/TimeLine";
import Card from "../components/base/Card";
import Navbar from "../components/base/Navbar";
import { Button } from "../components/ui/button";
import Footer from "../components/base/Footer";
import Hero from "../components/Hero";

function Home() {
  return (
    <main>
      <Navbar />
      <section className="py-14 bg-background ">
        <div className="mx-auto container space-y-24 w-11/12 py-20">
          <Hero />
          <Feature/>
        </div>

        <div className="bg-[#F8F8F9]">
          <HowItWorks />
        </div>

        <div className="mx-auto container space-y-24 w-11/12 py-20">
          <TimeLine />
          <Card className="bg-accent! space-y-6 text-center text-white">
            <h1 className="font-semibold md:text-5xl text-3xl">
              Ready to create your first moment?
            </h1>
            <p className="max-w-lg mx-auto">
              Start planning unforgettable dates and build a timeline of
              memories that last forever.
            </p>
            <Button size={'lg'} className="bg-white  text-primary">
              <Heart /> Get Started Free
            </Button>
          </Card>
        </div>
        
        <hr />

        <Footer/>
      </section>
    </main>
  );
}

export default Home;
