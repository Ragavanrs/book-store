import React from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BookOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import "./AppLayout.css";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem("token");

    // Redirect to login page and replace current history entry
    navigate("/", { replace: true });
    //console.log("done");
    // Optionally, you can also clear the history stack
    window.history.pushState(null, "", "/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          className="logo"
          style={{ padding: 16, textAlign: "center", color: "white" }}
        >
          Bookstore
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to={`/booklist/${localStorage.getItem("userId")}`}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to={`/add-book/${localStorage.getItem("userId")}`}>
              Add Book
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
            <Link to={`/order/${localStorage.getItem("userId")}`}>
              Place order
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BookOutlined />}>
            <Link to={`/order-summary/${localStorage.getItem("userId")}`}>
              order Summary
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <h2 style={{ marginLeft: 16 }}>Book Store</h2>
        </Header>
        <Content style={{ margin: "16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
