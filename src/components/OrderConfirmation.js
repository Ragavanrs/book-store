import React from "react";
import { Result, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const handleBackToHome = () => {
    navigate(`/booklist/${userId}`);
  };

  return (
    <div
      className="order-confirmation-container"
      style={{ padding: "20px", textAlign: "center" }}
    >
      <Result
        status="success"
        title="Order Placed Successfully!"
        subTitle="Thank you for your purchase. Your order is being processed."
        extra={[
          <Button type="primary" key="home" onClick={handleBackToHome}>
            Back to Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default OrderConfirmation;
