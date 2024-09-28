import React from "react";
import { useNavigate } from "react-router-dom";
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
  shopName,
}) => {
  const navigate = useNavigate();
  // const handleSubmit = async () => {
  //   console.log("Add to cart clicked");
  //   console.log(userId, productId, shopId);
  //   const data = {
  //     userId: userId,
  //     productId: productId,
  //     shopId: shopId,
  //   };

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
  // };
  const goToProductDetails = () => {
    const data = {
      title: title,
      description: description,
      price: price,
      image_url: image_url,
      shopId: shopId,
      userId: userId,
      productId: productId,
      quantity: quantity,
      shopName: shopName
    };
    navigate("/productDetails", { state: data });
  };

  return (
    <div className="cardWrapper" onClick={goToProductDetails}>
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


