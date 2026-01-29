import "./Categories.css";

const categories = [
  { name: "Nuts", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef" },
  { name: "Seeds", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2" },
  { name: "Coffee Powder", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
  { name: "Tea Powder", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb" },
  { name: "Herbal Powders", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25" }
];

export default function Categories() {
  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-grid">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <img src={cat.image} alt={cat.name} />
            <div className="overlay">
              <p>{cat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
