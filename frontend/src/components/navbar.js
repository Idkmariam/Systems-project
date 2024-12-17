import React,{useState} from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Optional for sidebar toggle
import "./navbar.css";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";


const Navbar = ({ searchQuery, handleSearch }) => {

    const { cartItems } = useCart();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile responsiveness
    const navigate = useNavigate();

    // Toggle sidebar on mobile
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
    
      const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
        setIsSidebarOpen(false); // Close sidebar after navigation
      };
    
      const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  return (
    <nav className="navbar">
      <div className="project-name">Picancci</div>
      <div className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/cart" className="nav-link cart-link">
          Cart
          {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
        </Link>
        <Link to="/stylish" className="nav-link">Stylish</Link>
        
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch} // Handle search input
        />
      </div>

      {/* Sidebar menu toggle */}
      <div className="sidebar-menu">
        <FaBars className="sidebar-icon" onClick={toggleSidebar} />
      </div>

    {/* Sidebar */}
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">Our Category</div>
        <ul className="sidebar-items">
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/outerwear")}
          >
            Outerwear and Tops
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/pants")}
          >
            Pants
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/skirts")}
          >
            Skirts
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/shoes")}
          >
            Shoes
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/bags")}
          >
            Bags
          </li>
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
