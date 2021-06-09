import React from "react";
import { useLoading, Bars, Puff } from "@agney/react-loading";

interface Props {}

const Spinner: React.FC<Props> = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff />,
  });

  return (
    <div
      style={{
        height: "60px",
        width: "60px",
        color: "#20D489",
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 99,
        transform: "translate(-50%,-50%)",
      }}
      {...containerProps}
    >
      {" "}
      {indicatorEl}{" "}
    </div>
  );
};

export { Spinner };
