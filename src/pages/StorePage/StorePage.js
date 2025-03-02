// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./StorePage.css";

// export default function ProductPage() {
//   const productsData = [
//     {
//       id: 1,
//       name: "Wireless Headphones",
//       image: "path/to/headphones.jpg",
//       price: 50,
//       soldOut: false,
//     },
//     {
//       id: 2,
//       name: "Gaming Mouse",
//       image: "path/to/mouse.jpg",
//       price: 30,
//       soldOut: true,
//     },
//     {
//       id: 3,
//       name: "Smart Watch",
//       image: "path/to/smartwatch.jpg",
//       price: 70,
//       soldOut: false,
//     },
//     {
//       id: 4,
//       name: "Bluetooth Speaker",
//       image: "path/to/speaker.jpg",
//       price: 40,
//       soldOut: false,
//     },
//     {
//       id: 5,
//       name: "4K Action Camera",
//       image: "path/to/camera.jpg",
//       price: 150,
//       soldOut: true,
//     },
//     {
//       id: 6,
//       name: "Portable Charger",
//       image: "path/to/charger.jpg",
//       price: 25,
//       soldOut: false,
//     },
//     {
//       id: 7,
//       name: "Smart Thermostat",
//       image: "path/to/thermostat.jpg",
//       price: 120,
//       soldOut: false,
//     },
//     {
//       id: 8,
//       name: "Noise-Cancelling Earbuds",
//       image: "path/to/earbuds.jpg",
//       price: 60,
//       soldOut: false,
//     },
//     {
//       id: 9,
//       name: "LED Desk Lamp",
//       image: "path/to/lamp.jpg",
//       price: 35,
//       soldOut: false,
//     },
//   ];

//   const [filteredProducts, setFilteredProducts] = useState(productsData);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState([0, Infinity]);

//   // Handle search query
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     filterProducts(query, priceRange);
//   };

//   // Handle price filter
//   const handlePriceFilter = (min, max) => {
//     const range = [min || 0, max || Infinity];
//     setPriceRange(range);
//     filterProducts(searchQuery, range);
//   };

//   // Filter products by search query and price range
//   const filterProducts = (query, range) => {
//     const [min, max] = range;
//     const filtered = productsData.filter(
//       (product) =>
//         product.name.toLowerCase().includes(query) &&
//         product.price >= min &&
//         product.price <= max
//     );
//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className="product-page">
//       <Header />
//       {/* Hero Section */}
//       <div className="hero-section">
//         <h1>Explore Our Exclusive Products</h1>
//         <p>Shop now and grab your favorite items at unbeatable prices!</p>
//       </div>

//       {/* Filters Section */}
//       <div className="filters-search-bar">
//         <div className="filters">
//           {/* <select>
//             <option value="all">Category</option>
//             <option value="electronics">Electronics</option>
//             <option value="fashion">Fashion</option>
//             <option value="home">Home</option>
//           </select> */}
//           <select
//             onChange={(e) => handlePriceFilter(null, e.target.value)}
//             defaultValue="">
//             <option value="" disabled>
//               Price Range
//             </option>
//             <option value="50">Up to $50</option>
//             <option value="100">Up to $100</option>
//             <option value="150">Up to $150</option>
//           </select>
//           <select defaultValue="">
//             <option value="" disabled>
//               Rating
//             </option>
//             <option value="5">5 Stars</option>
//             <option value="4">4 Stars & Above</option>
//             <option value="3">3 Stars & Above</option>
//           </select>
//         </div>
//         <div className="search">
//           <input
//             type="text"
//             placeholder="Search for products..."
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <button className="btn search-btn">Search</button>
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="product-grid">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div className="product-card" key={product.id}>
//               <img src={product.image} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>${product.price}</p>
//               {product.soldOut ? (
//                 <span className="sold-out">Sold Out</span>
//               ) : (
//                 <button className="btn add-to-cart">Add to Cart</button>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className="no-products-message">
//             <p>No products found.</p>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <footer>
//         <p>
//           &copy; 2024 StoreName. All rights reserved. Follow us on{" "}
//           <a href="/">Facebook</a>, <a href="/">Twitter</a>,{" "}
//           <a href="/">Instagram</a>.
//         </p>
//       </footer>
//     </div>
//   );
// }

// function Header() {
//   const navigate = useNavigate();
//   return (
//     <header className="csv-header">
//       <div className="logo">
//         <p>Logo</p>
//       </div>

//       <div className="header-links">
//         <a href="/HomePage">Home</a>
//         <a href="/store">Store</a>
//         <a href="/chatbot">Chatbot</a>
//         <a href="/upload">Upload File</a>
//       </div>

//       <div className="Head-right">
//         <div className="profile">
//           <span className="material-symbols-rounded head-icon">person</span>
//           <a href="/">Profile</a>
//         </div>
//         <button className="logout-btn" onClick={() => navigate("/login")}>
//           Log Out
//         </button>
//       </div>
//     </header>
//   );
// }

/*******************************************************************************************************/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StorePage.css";

export default function ProductPage() {
  const [productsData, setProductsData] = useState([]); // State to store products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, Infinity]);

  // Fetch products data from the backend on component mount using async/await
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse the JSON response
        setProductsData(data); // Store the fetched data in state
        setFilteredProducts(data); // Initially show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run once on mount

  // Handle search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterProducts(query, priceRange);
  };

  // Handle price filter
  const handlePriceFilter = (min, max) => {
    const range = [min || 0, max || Infinity];
    setPriceRange(range);
    filterProducts(searchQuery, range);
  };

  // Filter products by search query and price range
  const filterProducts = (query, range) => {
    const [min, max] = range;
    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(query) &&
        product.price >= min &&
        product.price <= max
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
      {/* Hero Section */}
      <Header />
      <div className="hero-section">
        <h1>Explore Our Exclusive Products</h1>
        <p>Shop now and grab your favorite items at unbeatable prices!</p>
      </div>

      {/* Filters Section */}
      <div className="filters-search-bar">
        <div className="filters">
          <select
            onChange={(e) => handlePriceFilter(null, e.target.value)}
            defaultValue="">
            <option value="" disabled>
              Price Range
            </option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
            <option value="150">Up to $150</option>
          </select>
          <select defaultValue="">
            <option value="" disabled>
              Rating
            </option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars & Above</option>
            <option value="3">3 Stars & Above</option>
          </select>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="btn search-btn">Search</button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              {product.soldOut ? (
                <span className="sold-out">Sold Out</span>
              ) : (
                <button className="btn add-to-cart">Add to Cart</button>
              )}
            </div>
          ))
        ) : (
          <div className="no-products-message">
            <p>No products found.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer>
        <p>
          &copy; 2024 StoreName. All rights reserved. Follow us on{" "}
          <a href="/">Facebook</a>, <a href="/">Twitter</a>,{" "}
          <a href="/">Instagram</a>.
        </p>
      </footer>
    </div>
  );
}

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
        <div className="profile">
          <span className="material-symbols-rounded head-icon">person</span>
          <a href="/">Profile</a>
        </div>
        <button className="logout-btn" onClick={() => navigate("/login")}>
          Log Out
        </button>
      </div>
    </header>
  );
}
