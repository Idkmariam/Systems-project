import React, { useState, useEffect } from "react";
import './category.css';
import Navbar from "./navbar";
import Footer from './footer';
import { useCart } from './CartContext';
import Reviews from './Reviews';

const Pants = () => {
    const [pants, setPants] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const { addItemToCart } = useCart();
    const [clickedItem, setClickedItem] = useState(null);
    
    useEffect(() => {
        fetch("/products.json")
          .then((response) => response.json())
          .then((data) => {
            setPants(data.pants);
            setLoading(false);
          })
          .catch((error) => console.error("Error fetching products:", error));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredPants = pants.filter((pant) =>
        pant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleItemClick = (item) => {
        // If the clicked item is already selected, toggle its visibility off
        if (clickedItem && clickedItem.id === item.id) {
            setClickedItem(null); // Deselect the item
        } else {
            setClickedItem(item); // Select the clicked item
        }
    };

    return (
        <div className="category-container">
            <Navbar 
                searchQuery={searchQuery} 
                handleSearch={(e) => setSearchQuery(e.target.value)} 
            />
            <h1>Pants</h1>
            <p>Explore our collection of pants designed for every season.</p>

            <div className="our-products">
                <div className="items">
                    {filteredPants.map((product) => (
                        <div key={product.id} className="itemm" onClick={() => handleItemClick(product)}>
                            <img src={product.image} alt={product.name} className="item-image" />
                            <div className="cont">
                                <p className="item-name">{product.name}</p>
                                <p className="item-price">{product.price}</p>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        addItemToCart(product); 
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                            {clickedItem && clickedItem.id === product.id && (
                                <p className="item-description">{product.description}</p>
                            )}
                            <Reviews productId={product.id} />
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Pants;
