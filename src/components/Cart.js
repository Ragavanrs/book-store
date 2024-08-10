// Cart.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Table } from "antd";

const Cart = () => {
  const location = useLocation();
  const { orderDetails } = location.state;
  console.log(orderDetails);
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
      render: (text) => `$${text}`,
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
      render: (text, record) => `$${record.price * record.quantity}`,
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

  return (
    <div>
      <h2>Order Summary</h2>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <h3>Total Cost: ${totalCost}</h3>
    </div>
  );
};

export default Cart;
