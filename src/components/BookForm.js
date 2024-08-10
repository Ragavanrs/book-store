import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css";
import "./BookForm.css"; // Create a custom CSS file for additional styles

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:8080/books", {
        title: values.title,
        author: values.author,
        isbn: values.isbn,
        price: values.price,
        img: values.img,
      });
      navigate("/booklist");
    } catch (error) {
      console.error("Failed to add book", error);
      message.error("Failed to add book");
    }
  };

  return (
    <div className="book-form-container">
      <h2>Add New Book</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the book title" }]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please enter the author name" }]}
        >
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="isbn"
          label="ISBN"
          rules={[{ required: true, message: "Please enter the ISBN" }]}
        >
          <Input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="img"
          label="Image URL"
          rules={[{ required: true, message: "Please enter the image URL" }]}
        >
          <Input
            value={img}
            onChange={(e) => {
              setImg(e.target.value);
              setImageUrl(e.target.value);
            }}
          />
        </Form.Item>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Book cover"
            style={{ width: "200px", marginTop: "20px" }}
          />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Book
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookForm;
