import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Table, Button, message } from "antd";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state;
  const { userId } = useParams();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) =>
        `$${(record.price * record.quantity).toFixed(2)}`,
    },
  ];

  const dataSource = orderDetails.map((item) => ({
    key: item.book.id,
    title: item.book.title,
    author: item.book.author,
    price: item.book.price,
    quantity: item.quantity,
    total: item.book.price * item.quantity,
  }));

  const totalCost = dataSource.reduce((acc, item) => acc + item.total, 0);

  const handleSaveOrder = async () => {
    try {
      const bookIds = dataSource.map((item) => item.key); // Extract book IDs

      await axios.post("http://localhost:8080/orders", bookIds, {
        params: {
          userId,
          totalCost,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      message.success("Order placed successfully!");
      navigate(`/order-confirmation/${userId}`);
    } catch (error) {
      message.error("Failed to place order");
      console.error("Failed to place order", error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Order Summary</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        className="cart-table"
      />
      <h3 className="total-cost">Total Cost: ${totalCost.toFixed(2)}</h3>
      <div className="button-container">
        <Button type="primary" size="large" onClick={handleSaveOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Cart;
