/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { KTSVG } from "../../../helpers";

type Props = {
  className: string;
  data?: any;
};

const StatsWidget3: React.FC<Props> = ({
  className,
  data = { title: "Chat ", sub: "HTML, Django", info: "26 people" },
}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className={`card-body`}>
        {/* begin::Section */}
        <div className="d-flex align-items-center">
          {/* begin::Symbol */}
          <div className="symbol symbol-50px me-5">
            <span className="symbol-label bg-white bg-opacity-10">
              <KTSVG
                className="svg-icon-2x svg-icon-white"
                path="/media/icons/stockholm/Communication/Group-chat.svg"
              />
            </span>
          </div>
          {/* end::Symbol */}

          {/* begin::Title */}
          <div>
            <a
              href="#"
              className="fs-1 text-white text-hover-primary fw-bolder"
            >
              {data.title}
            </a>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Section */}

        {/* begin::Info */}
        <div className="fw-bolder text-white pt-7">
          <span className="d-block">{data.info}</span>
          {/* <span className="d-block pt-2">140 Comments</span> */}
        </div>
        {/* end::Info */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { StatsWidget3 };
