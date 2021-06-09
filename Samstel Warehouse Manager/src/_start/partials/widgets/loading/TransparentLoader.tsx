import React from "react";
import { useLoading, Bars } from "@agney/react-loading";
import { Spinner } from "./Spinner";

interface Props {}

const TransparentLoader: React.FC<Props> = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Bars />,
  });

  return (
    <div
      style={{
        width: "1000px",
        height: "100vh",
        position: "fixed",
        top: "50%",
        left: "50%",
        opacity: "50%",
        zIndex: 99,
        backgroundColor: "white",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Spinner />
    </div>
  );
};

export { TransparentLoader };
