import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({
  title = "Sample Product",
  description = "This is a sample product description.",
  price = "99.99",
  shopId = "sampleShopId",
  userId = "sampleUserId",
  productId = "sampleProductId",
  quantity = 10,
  image_url = "https://placehold.co/600x400",
  shopName = "Sample Shop",
}) => {
  const navigate = useNavigate();

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
      shopName: shopName,
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


