import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

export default function Shop() {
  return (
    <>
      <Navbar />

      <section className="shop">
        <h2>Shop All Products</h2>

        <div className="shop-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
