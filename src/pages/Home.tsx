import { Heart } from "lucide-react";
import Feature from "../components/Feature";
import HowItWorks from "../components/HowItWorks";
import TimeLine from "../components/TimeLine";
import Card from "../components/base/Card";
import Navbar from "../components/base/Navbar";
import { Link } from "react-router-dom";
import { buttonVariants } from "../components/ui/button";
import Footer from "../components/base/Footer";
import Hero from "../components/Hero";
import FloatingLoves from "../components/base/FloatingLoves";

function Home() {
  return (
    <main>
      <Navbar />
      <section className="py-14 dark:bg-dark overflow-hidden bg-background relative h-full">
        <FloatingLoves />

        <div className="mx-auto container space-y-24 w-11/12 py-20">
          <Hero />
          <div id="features" className="scroll-mt-20">
            <Feature />
          </div>
        </div>

        <div id="how-it-works" className="scroll-mt-20 bg-[#F8F8F9] dark:bg-card">
          <HowItWorks />
        </div>

        <div className="mx-auto container space-y-24 w-11/12 py-20">
          <div id="timeline" className="scroll-mt-20">
            <TimeLine />
          </div>
          <Card className="bg-accent! space-y-6 text-center text-white">
            <h1 className="font-semibold md:text-5xl text-3xl">
              Ready to create your first moment?
            </h1>
            <p className="max-w-lg mx-auto">
              Start planning unforgettable dates and build a timeline of
              memories that last forever.
            </p>
            <Link
              to="/auth?tab=signup"
              className={buttonVariants({
                size: "lg",
                className: "bg-white dark:bg-primary text-primary",
              })}
            >
              <Heart /> Get Started Free
            </Link>
          </Card>
        </div>

        <hr />

        <Footer />
      </section>
    </main>
  );
}

export default Home;
