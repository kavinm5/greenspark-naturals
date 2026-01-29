import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>GS Store</h3>
        <p>
          Natural & organic products for a healthier lifestyle.
        </p>

        <p className="copyright">
          © {new Date().getFullYear()} GS Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
