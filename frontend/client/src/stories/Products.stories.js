import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// import "index.scss";

import ProductList from "../components/Products/ProductList";
import ProductItem from "../components/Products/ProductItem";
import ProductForm from "../components/Products/ProductForm";

export const ProductListComponent = () => <ProductList />
export const ProductItemComponent = () => <ProductItem />
export const ProductFormComponent = () => <ProductForm />

export default {
  title: "Components/ProductList",
  component: ProductList
};