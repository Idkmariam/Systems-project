import React, { createContext, useState, useContext, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// Custom hook to access CartContext
export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  // Initialize cartItems from localStorage (or default to an empty array if nothing is stored)
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Effect to update localStorage whenever cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    let updatedCart;
    if (existingItem) {
      // If the item already exists, update its quantity
      updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      // Otherwise, add the new item with a quantity of 1
      updatedCart = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(updatedCart);
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  // Function to update the quantity of an item
  const updateItemQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(newQuantity, 1) } // Ensure quantity is at least 1
        : item
    );

    setCartItems(updatedCart);
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Clear cart data from localStorage
  };

  // Function to handle checkout
  const checkoutCart = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return false; // Return false if checkout fails
    }

    try {
      // Simulate sending cart data to a server (you can replace this with your actual API call)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });

      if (response.ok) {
        alert("Checkout successful!");
        clearCart(); // Clear the cart after successful checkout
        return true; // Return true if checkout succeeds
      } else {
        alert("Checkout failed. Please try again.");
        return false; // Return false if checkout fails
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
      return false; // Return false if checkout fails
    }
  };

  // Return the provider with context values
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        checkoutCart, // Provide checkoutCart function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
