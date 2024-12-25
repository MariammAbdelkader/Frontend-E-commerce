import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="csv-header">
      <div className="logo">
        <p>Logo</p>
      </div>

      <div className="header-links">
        <a href="/HomePage">Home</a>
        <a href="/store">Store</a>
        <a href="/chatbot">Chatbot</a>
        <a href="/upload">Upload File</a>
      </div>

      <div className="Head-right">
        <div
          className="profile"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          <span className="material-symbols-rounded head-icon">person</span>
          <span>Profile</span>
        </div>
        <button className="logout-btn" onClick={() => navigate("/login")}>
          Log Out
        </button>
      </div>
    </header>
  );
}

export default Header;