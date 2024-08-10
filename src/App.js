import React from "react";
import { Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import OrderForm from "./components/OrderForm";
import AppLayout from "./components/AppLayout";
import Cart from "./components/Cart";
import OrderConfirmation from "./components/OrderConfirmation";
import OrderSummary from "./components/OrderSummary";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="*"
          element={
            <AppLayout>
              <Routes>
                <Route path="/booklist/:userId" element={<BookList />} />
                <Route path="/add-book/:userId" element={<BookForm />} />
                <Route path="/order/:userId" element={<OrderForm />} />
                <Route path="/cart/:userId" element={<Cart />} />
                <Route
                  path="/order-confirmation/:userId"
                  element={<OrderConfirmation />}
                />
                <Route
                  path="/order-summary/:userId"
                  element={<OrderSummary />}
                />
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
