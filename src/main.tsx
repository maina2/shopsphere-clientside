import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ProfileProvider } from "./context/ProfileContext";
import { ProductsProvider } from "./context/ProductsContext.tsx";
import { CategoriesProvider } from "./context/CategoriesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </ProfileProvider>
    </AuthProvider>
  </StrictMode>
);
