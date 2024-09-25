import React from "react";
import "./Card.css";
const Card = ({
  title,
  description,
  price,
  shopId,
  userId,
  productId,
  quantity,
  image_url,
}) => {
  const handleSubmit = async () => {
    console.log("Add to cart clicked");
    console.log(userId, productId, shopId);
    const data = {
      userId: userId,
      productId: productId,
      shopId: shopId,
    };

    // try {
    //   const result = await fetch("http://localhost:5000/sets/addtocart", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (result.status === 200) {
    //     console.log("Product added to cart");
    //   } else {
    //     console.error("Failed to add product to cart");
    //   }
    // } catch (error) {
    //   console.error("Error adding product to cart:", error);
    // }
  };

  return (
    <div className="cardWrapper" onClick={handleSubmit}>
      <img src={image_url} alt="product" className="cardImage" />
      <div className="PriceTag">
        <div>
          <div className="priceTitle">{title}</div>
          
          <div className="priceAmm">${price}</div>
        </div>
      </div>
    </div>
  );
};



export default Card;


