import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: ""
  });
  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    const data = await apiRequest("/api/admin/products", "GET", null, true);
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitProduct = async () => {
    if (editingId) {
      await apiRequest(
        `/api/admin/products/${editingId}`,
        "PUT",
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          image: form.image,
          stock: Number(form.stock)
        },
        true
      );
    } else {
      await apiRequest(
        "/api/admin/products",
        "POST",
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          image: form.image,
          stock: Number(form.stock)
        },
        true
      );
    }

    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      stock: ""
    });
    setEditingId(null);
    loadProducts();
  };

  const editProduct = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price,
      image: p.image || "",
      stock: p.stock
    });
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await apiRequest(`/api/admin/products/${id}`, "DELETE", null, true);
      loadProducts();
    }
  };

  const toggleStock = async (id, isActive) => {
    await apiRequest(
      `/api/admin/products/${id}/stock?is_active=${!isActive}`,
      "PATCH",
      null,
      true
    );
    loadProducts();
  };

  return (
    <div>
      <h2>Manage Products</h2>

      {/* ADD / EDIT FORM */}
      <div style={{ marginBottom: 30 }}>
        <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        /><br /><br />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        /><br /><br />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        /><br /><br />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        /><br /><br />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        /><br /><br />

        <button onClick={submitProduct}>
          {editingId ? "Update" : "Add"} Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <h3>Products List</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: 10 }}>
            <strong>{p.name}</strong> – ₹{p.price} – Stock: {p.stock} –{" "}
            {p.is_active ? "Active" : "Out of Stock"}

            <br />

            <button onClick={() => editProduct(p)}>Edit</button>{" "}
            <button onClick={() => deleteProduct(p.id)}>Delete</button>{" "}
            <button onClick={() => toggleStock(p.id, p.is_active)}>
              {p.is_active ? "Disable" : "Enable"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
