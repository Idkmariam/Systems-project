import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = ({ productId }) => {
  const [rating, setRating] = useState(1);

  // Load the existing review for the current product when it changes
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const productReview = savedReviews.find((review) => review.productId === productId);
    if (productReview) {
      setRating(productReview.rating);
    }
  }, [productId]);

  const handleAddReview = () => {
    const newReviewObj = {
      id: Date.now(),
      productId,
      review: "",  // No review text, only rating
      rating,
    };

    // Save the new review to localStorage, replacing any existing review for the same productId
    const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const updatedReviews = allReviews.filter((rev) => rev.productId !== productId); // Remove previous review for this product
    updatedReviews.push(newReviewObj);

    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  return (
    <div className="reviews">
      
      <div className="rating">
        
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => setRating(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <button onClick={handleAddReview}>Submit Review</button>

      <div className="review-list">
        {rating ? (
          <div className="review">
            <p><strong>Rating: {rating} stars</strong></p>
          </div>
        ) : (
          <p>No review yet. Be the first to rate!</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;