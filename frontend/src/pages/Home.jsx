import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
