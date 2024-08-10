import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "antd";
//import "antd/dist/antd.min.css";
import "./BookList.css"; // Create this CSS file for custom styles

const { Meta } = Card;

function BookList() {
  const [books, setBooks] = useState([]);
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

  const getImageUrl = (imageFileName) => {
    return `/images/${imageFileName}`;
  };

  return (
    <div>
      <h2>Book List</h2>
      {/* <Link to="/add-book">Add New Book</Link> */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {books.map((book) => (
          <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <div className="image-container">
                  <img
                    alt={book.title}
                    src={
                      getImageUrl(book.img) || "https://via.placeholder.com/150"
                    }
                    className="book-image"
                  />
                </div>
              }
            >
              <Meta title={book.title} description={`by ${book.author}`} />
              <p style={{ marginTop: "8px", fontWeight: "bold" }}>
                ${book.price}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BookList;
