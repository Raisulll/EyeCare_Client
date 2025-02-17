import React, { useState, useEffect } from "react";

const OrdersComponent = ({ localdata }) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Static dummy data
    const dummyOrders = [
      {
        ORDER_ID: 1,
        PATIENT_NAME: "John Doe",
        ORDER_DATE: "2023-10-01T12:00:00Z",
        DELIVERY_AGENCY_NAME: "Quick Delivery",
        PRODUCT_NAME: "Painkiller",
        ORDER_QUANTITY: 2,
      },
      {
        ORDER_ID: 1,
        PATIENT_NAME: "John Doe",
        ORDER_DATE: "2023-10-01T12:00:00Z",
        DELIVERY_AGENCY_NAME: "Quick Delivery",
        PRODUCT_NAME: "Bandages",
        ORDER_QUANTITY: 5,
      },
      {
        ORDER_ID: 2,
        PATIENT_NAME: "Jane Smith",
        ORDER_DATE: "2023-10-02T14:30:00Z",
        DELIVERY_AGENCY_NAME: "Fast Ship",
        PRODUCT_NAME: "Antibiotics",
        ORDER_QUANTITY: 1,
      },
      {
        ORDER_ID: 2,
        PATIENT_NAME: "Jane Smith",
        ORDER_DATE: "2023-10-02T14:30:00Z",
        DELIVERY_AGENCY_NAME: "Fast Ship",
        PRODUCT_NAME: "Vitamins",
        ORDER_QUANTITY: 3,
      },
    ];

    // Format the date using toLocaleDateString
    dummyOrders.forEach((order) => {
      order.ORDER_DATE = new Date(order.ORDER_DATE).toLocaleDateString();
    });

    // Group orders by ORDER_ID
    const groupedOrders = dummyOrders.reduce((acc, order) => {
      const { ORDER_ID } = order;
      if (!acc[ORDER_ID]) {
        acc[ORDER_ID] = {
          ORDER_ID,
          PATIENT_NAME: order.PATIENT_NAME,
          ORDER_DATE: order.ORDER_DATE,
          DELIVERY_AGENCY_NAME: order.DELIVERY_AGENCY_NAME,
          products: [],
        };
      }
      acc[ORDER_ID].products.push({
        PRODUCT_NAME: order.PRODUCT_NAME,
        ORDER_QUANTITY: order.ORDER_QUANTITY,
      });
      return acc;
    }, {});

    setOrders(Object.values(groupedOrders));
    setLoading(false);
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order) => (
        <div
          key={order.ORDER_ID}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h2>Order ID: {order.ORDER_ID}</h2>
          <p>Patient: {order.PATIENT_NAME}</p>
          <p>Order Date: {order.ORDER_DATE}</p>
          <p>Delivery Agency: {order.DELIVERY_AGENCY_NAME}</p>
          <h3>Products:</h3>
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>
                {product.PRODUCT_NAME} - Quantity: {product.ORDER_QUANTITY}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersComponent;
