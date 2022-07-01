import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";

export const publicRoutes = [
  { path: "/", component: Home, exact: true },
  { path: "/products", component: ProductPage, exact: false },
];
