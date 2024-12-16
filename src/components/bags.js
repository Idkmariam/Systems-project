import React, { useState, useEffect } from "react";
import './category.css';
import Navbar from "./navbar";
import Footer from './footer';
import { useCart } from './CartContext';

const Bags = () => {
    const [bags, setBags] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const { addItemToCart } = useCart();
    const [clickedItem, setClickedItem] = useState(null);

    useEffect(() => {
        fetch("/products.json")
            .then((response) => response.json())
            .then((data) => {
                setBags(data.bags); // Adjust to match your JSON structure
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredBags = bags.filter((bag) =>
        bag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleItemClick = (item) => {
        if (clickedItem && clickedItem.id === item.id) {
            setClickedItem(null); // Deselect the item
        } else {
            setClickedItem(item); // Select the clicked item
        }
    };

    return (
        <div className="category-container">
            {/* Navbar */}
            <Navbar 
                searchQuery={searchQuery} 
                handleSearch={(e) => setSearchQuery(e.target.value)} 
            />

            {/* Page Title and Description */}
            <h1>Bags</h1>
            <p>Explore our collection of bags designed for every season.</p>

            {/* Product Listing */}
            <div className="our-products">
                <div className="items">
                    {filteredBags.map((product) => (
                        <div key={product.id} className="itemm" onClick={() => handleItemClick(product)}>
                            <img src={product.image} alt={product.name} className="item-image" />
                            <div className="cont">
                                <p className="item-name">{product.name}</p>
                                <p className="item-price">{product.price}</p>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering handleItemClick
                                        addItemToCart(product); // Add item to cart
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                            {clickedItem && clickedItem.id === product.id && (
                                <p className="item-description">{product.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Bags;
