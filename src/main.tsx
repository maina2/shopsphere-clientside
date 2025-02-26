import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ProfileProvider } from "./context/ProfileContext";
import { ProductsProvider } from "./context/ProductsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
        </ProductsProvider>

      </ProfileProvider>
    </AuthProvider>
  </StrictMode>
);
