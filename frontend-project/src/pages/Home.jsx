import ControlledCarousel from "../components/carousels";
import CardProducts from "../components/Cards";

function Home() {
  return (
    <>
      <div className="container py-4"></div>
      <ControlledCarousel />
      <CardProducts />
    </>
  );
}

export default Home;
