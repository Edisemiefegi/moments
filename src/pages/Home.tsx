import Feature from "../components/base/Feature";
import Navbar from "../components/base/Navbar";

function Home() {
  return (
    <main>
      <Navbar />
      <section className="py-14 bg-background ">
        <div className="mx-auto container w-11/12 py-20">
          <Feature />
        </div>
      </section>
    </main>
  );
}

export default Home;
