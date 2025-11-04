import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layout Components
import Header from "@/components/organisms/Header";
import CartDrawer from "@/components/organisms/CartDrawer";

// Custom Hooks
import { useCart } from "@/hooks/useCart";

function Layout() {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout
    clearCart();
  };

  // Context object to pass to all child routes
  const outletContext = {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    handleCheckout,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <Outlet context={outletContext} />
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Layout;