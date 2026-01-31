export default function ProductCard({ product, hideAddButton }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>

      {!hideAddButton && (
        <button>Add to Cart</button>
      )}
    </div>
  );
}
