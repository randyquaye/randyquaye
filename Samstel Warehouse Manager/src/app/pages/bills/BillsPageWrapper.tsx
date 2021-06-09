/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  getConfig,
  IThemeConfig,
  PageDataContainer,
  PageLink,
  useTheme,
} from "../../../_start/layout/core";
import { BillsPage } from "./BillsPage";

const breadCrumbs: Array<PageLink> = [
  {
    title: "Home",
    path: "/",
    isActive: false,
  },
];

const defaultPageConfig = getConfig();
const billsPageConfig: Partial<IThemeConfig> = {
  sidebar: {
    ...defaultPageConfig.sidebar,
    content: "user",
    bgColor: "bg-info",
  },
};

const BillsPageWrapper: React.FC = () => {
  const { setTheme } = useTheme();
  // Refresh UI after config updates
  useEffect(() => {
    setTheme(billsPageConfig);
    return () => {
      setTheme(defaultPageConfig);
    };
  }, []);

  return (
    <>
      <PageDataContainer breadcrumbs={breadCrumbs} />
      <BillsPage />
    </>
  );
};

export default BillsPageWrapper;
