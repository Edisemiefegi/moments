import Feature from "../components/Feature";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/base/Navbar";


function Home() {
  return (
    <main>
      <Navbar />
      <section className="py-14 bg-background ">
        <div className="mx-auto container space-y-24 w-11/12 py-20">
          <Feature />
          <HowItWorks/>
        </div>
      </section>
    </main>
  );
}

export default Home;
