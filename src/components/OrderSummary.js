import React, { useEffect, useState } from "react";
import { Table, Card, Typography } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./OrderSummary.css"; // Import CSS file for custom styles

const { Title } = Typography;

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/orders/user/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, [userId]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Books",
      key: "books",
      render: (text, record) => (
        <div>
          {record.books.map((book) => (
            <Card
              key={book.id}
              title={book.title}
              style={{ marginBottom: "10px", width: "200px" }} // Adjust card width to fit smaller images
              cover={
                <div className="image-container">
                  <img
                    alt={book.title}
                    src={`/images/${book.img}`}
                    className="small-image"
                  />
                </div>
              }
            >
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
            </Card>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Order Summary</Title>
      <Table
        columns={columns}
        dataSource={orders.map((order) => ({
          key: order.id,
          ...order,
        }))}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default OrderSummary;
