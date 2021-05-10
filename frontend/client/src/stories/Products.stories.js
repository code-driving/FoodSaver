import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// import "index.scss";
<<<<<<< HEAD

import ProductList from "../components/Products/ProductList";
import ProductItem from "../components/Products/ProductItem";

export const ProductListComponent = () => <ProductList />
export const ProductItemComponent = () => <ProductItem />
=======
import Products from "../components/Products"
import ProductList from "../components/Products/ProductList";
import ProductItem from "../components/Products/ProductItem";
import ProductForm from "../components/Products/ProductForm";

export const ProductsComponent = () => <Products />
export const ProductListComponent = () => <ProductList />
export const ProductItemComponent = () => <ProductItem />
export const ProductFormComponent = () => <ProductForm />

export default {
  title: "Components/Products",
  component: Products
};
>>>>>>> 6c0341075e61592c2e7f4dda8902cd17379a5b30
