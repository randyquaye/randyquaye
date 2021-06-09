/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  getConfig,
  IThemeConfig,
  PageDataContainer,
  PageLink,
  useTheme,
} from "../../../_start/layout/core";
import { ProductDashboardPage } from "./ProductDashPage";

const breadCrumbs: Array<PageLink> = [
  {
    title: "Home",
    path: "/",
    isActive: false,
  },
  {
    title: "Inventory",
    path: "",
    isActive: false,
  },
];

const defaultPageConfig = getConfig();
const profilePageConfig: Partial<IThemeConfig> = {
  sidebar: {
    ...defaultPageConfig.sidebar,
    content: "user",
    bgColor: "bg-info",
  },
};

const ProductDashWrapper: React.FC = () => {
  const { setTheme } = useTheme();
  // Refresh UI after config updates
  useEffect(() => {
    setTheme(profilePageConfig);
    return () => {
      setTheme(defaultPageConfig);
    };
  }, []);

  return (
    <>
      <PageDataContainer breadcrumbs={breadCrumbs} />
      <ProductDashboardPage />
    </>
  );
};

export default ProductDashWrapper;
