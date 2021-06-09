/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { PageTitle } from "../../../_start/layout/core";
import { ProductDetails } from "./components/product-details/ProductDetails";

export function ProductDashboardPage() {
  return (
    <>
      <PageTitle>Product Details</PageTitle>
      <ProductDetails />
    </>
  );
}
