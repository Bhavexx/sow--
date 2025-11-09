import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./PriceList.css";

// ✅ Import local product images from assets
import samsungMonitor from "../../assets/Samsung 27” Monitor.jpeg";
import googlePixel8 from "../../assets/Google Pixel 8.jpeg";
import ankerPowerBank from "../../assets/Anker Power Bank 20,000mAh.jpg";
import jblSpeaker from "../../assets/JBL Charge 5 Speaker.jpg";
import samsungWatch from "../../assets/Samsung Galaxy Watch 6.jpg";
import nikonCamera from "../../assets/Nikon D5600 Camera.webp";
import razerKeyboard from "../../assets/Razer BlackWidow Keyboard.jpeg";
import hpLaptop from "../../assets/HP Pavilion Laptop.jpg";
import lenovoLaptop from "../../assets/Lenovo IdeaPad Slim 5.jpeg";
import oneplus12 from "../../assets/OnePlus 12.webp";
import sonyHeadphones from "../../assets/Sony WH-1000XM5.jpeg";
import appleWatch from "../../assets/Apple Watch Series 9.jpg";
import asusLaptop from "../../assets/Asus TUF Gaming Laptop.webp"; // ✅ Added this import

// ✅ All product data
const products = [
  { id: 1, name: "Apple MacBook Air M2", price: 95000, img: "https://m.media-amazon.com/images/I/71eXNIDUGjL._SL1500_.jpg" },
  { id: 2, name: "Dell XPS 13", price: 88000, img: "https://m.media-amazon.com/images/I/71T5NVOgbpL._SL1500_.jpg" },
  { id: 3, name: "HP Pavilion Laptop", price: 72000, img: hpLaptop },
  { id: 4, name: "Lenovo IdeaPad Slim 5", price: 68000, img: lenovoLaptop },
  { id: 5, name: "Asus TUF Gaming Laptop", price: 99000, img: asusLaptop }, // ✅ Corrected here
  { id: 6, name: "iPhone 15", price: 79999, img: "https://m.media-amazon.com/images/I/71657TiFeHL._SL1500_.jpg" },
  { id: 7, name: "Samsung Galaxy S24", price: 85999, img: samsungMonitor },
  { id: 8, name: "OnePlus 12", price: 69999, img: oneplus12 },
  { id: 9, name: "Google Pixel 8", price: 81999, img: googlePixel8 },
  { id: 10, name: "Sony WH-1000XM5", price: 29999, img: sonyHeadphones },
  { id: 11, name: "JBL Charge 5 Speaker", price: 14999, img: jblSpeaker },
  { id: 12, name: "Apple Watch Series 9", price: 41999, img: appleWatch },
  { id: 13, name: "Samsung Galaxy Watch 6", price: 36999, img: samsungWatch },
  { id: 14, name: "Canon EOS 1500D Camera", price: 45999, img: "https://m.media-amazon.com/images/I/914hFeTU2-L._SL1500_.jpg" },
  { id: 15, name: "Nikon D5600 Camera", price: 51999, img: nikonCamera },
  { id: 16, name: "Logitech MX Master 3 Mouse", price: 8499, img: "https://m.media-amazon.com/images/I/61ni3t1ryQL._SL1500_.jpg" },
  { id: 17, name: "Razer BlackWidow Keyboard", price: 12999, img: razerKeyboard },
  { id: 18, name: "Samsung 27” Monitor", price: 17999, img: samsungMonitor },
  { id: 19, name: "LG Ultrawide Monitor", price: 28999, img: "https://m.media-amazon.com/images/I/81Zt42ioCgL._SL1500_.jpg" },
  { id: 20, name: "Seagate 2TB Hard Drive", price: 5999, img: "https://m.media-amazon.com/images/I/61l9ppRIiqL._SL1500_.jpg" },
  { id: 21, name: "Apple AirPods Pro", price: 23999, img: "https://m.media-amazon.com/images/I/71bhWgQK-cL._SL1500_.jpg" },
  { id: 22, name: "Anker Power Bank", price: 4499, img: ankerPowerBank },
];

const PriceList = () => {
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleBuy = (product) => {
    setSelected(product);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare purchase data
    const purchaseData = {
      productId: selected.id,
      productName: selected.name,
      productPrice: selected.price,
      customerName: formData.name,
      customerEmail: formData.email,
      customerAddress: formData.address,
      customerPhone: formData.phone
    };

    try {
      console.log('Sending purchase data to backend:', purchaseData);
      
      // Send purchase data to backend
      const response = await fetch('http://localhost:5000/api/purchases/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData)
      });

      console.log('Received response from backend:', response);
      console.log('Response status:', response.status);
      console.log('Response ok?', response.ok);

      // Try to parse the response
      let result;
      try {
        result = await response.json();
        console.log('Response data:', result);
      } catch (parseError) {
        console.error('Error parsing response JSON:', parseError);
        const text = await response.text();
        console.log('Response text:', text);
        throw new Error(`Failed to parse response: ${text}`);
      }

      if (response.ok) {
        // Close form and show success message
        setShowForm(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
        
        // Reset form data
        setFormData({
          name: "",
          email: "",
          address: "",
          phone: "",
        });
      } else {
        console.error('Purchase failed:', result.message);
        alert(`Purchase failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      if (error instanceof TypeError) {
        alert('Network error: Could not connect to the server. Please make sure the backend is running.');
      } else {
        alert('An error occurred while processing your purchase. Please try again.');
      }
    }
  };

  return (
    <div className="pricelist-page">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <h1>🛒 Available Products</h1>
          <div className="product-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <div className="image-wrapper">
                  <img
                    src={p.img}
                    alt={p.name}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/200x200?text=No+Image")
                    }
                  />
                </div>
                <h3>{p.name}</h3>
                <p>₹{p.price.toLocaleString()}</p>
                <button onClick={() => handleBuy(p)} className="buy-btn">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Buy {selected?.name}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Address"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <button type="submit" className="submit-btn">
                Confirm Purchase
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="success-popup">
          <div className="success-circle">✅</div>
          <p>Purchase Successful!</p>
        </div>
      )}
    </div>
  );
};

export default PriceList;