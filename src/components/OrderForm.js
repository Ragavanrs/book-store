// OrderForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, InputNumber, Button } from "antd";
import "./OrderForm.css";

const OrderForm = () => {
  const [books, setBooks] = useState([]);
  const [order, setOrder] = useState({});
  const navigate = useNavigate();
  const { userId } = useParams();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/books", {
          params: { userId },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };
    fetchBooks();
  }, []);

  const handleQuantityChange = (bookId, value) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [bookId]: value,
    }));
  };

  const handleSubmit = () => {
    const orderDetails = books
      .map((book) => ({
        book,
        quantity: order[book.id] || 0,
      }))
      .filter((item) => item.quantity > 0);

    navigate(`/cart/${userId}`, { state: { orderDetails } });
  };

  const getImageUrl = (imageFileName) => {
    return `/images/${imageFileName}`;
  };

  return (
    <div className="order-form-container">
      <h2>Place Order</h2>
      <div className="order-form-grid">
        {books.map((book) => (
          <Card key={book.id} className="order-form-card" title={book.title}>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <img
              src={getImageUrl(book.img) || "https://via.placeholder.com/150"}
              alt={book.title}
              style={{ width: "100%", height: "auto" }}
            />
            <div className="quantity-control">
              <InputNumber
                min={0}
                defaultValue={0}
                onChange={(value) => handleQuantityChange(book.id, value)}
              />
            </div>
          </Card>
        ))}
      </div>
      <br />
      <Button type="primary" onClick={handleSubmit}>
        Execute Order
      </Button>
    </div>
  );
};

export default OrderForm;
