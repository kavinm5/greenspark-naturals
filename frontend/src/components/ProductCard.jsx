export default function ProductCard({ product, hideAddButton }) {
  return (
    <div className="gs-product-card">
      <div className="gs-product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <h3 className="gs-product-name">{product.name}</h3>
      <p className="gs-product-price">₹ {product.price}</p>

      {!hideAddButton && (
        <button className="gs-add-btn">Add to Cart</button>
      )}
    </div>
  );
}
