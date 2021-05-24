/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import { Dropdown2 } from "../../content/dropdown/Dropdown2";
import "./style.css";
import { getCSSVariableValue } from "../../../assets/ts/_utils";

type Props = {
  className: string;
  innerPadding?: string;
};

const StatsWidget2: React.FC<Props> = ({ className, innerPadding = "" }) => {
  const [activeTab, setActiveTab] = useState("#tab1");
  useEffect(() => {
    setTab(1);
  }, []);

  const setTab = (tabNumber: number) => {
    setActiveTab(`#tab${tabNumber}`);
  };

  const cats = ["red", "yel", "gre", "blu", "bla"];

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header align-items-center border-0 mt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bolder text-dark fs-3">Milestones</span>
          <span className="text-muted mt-2 fw-bold fs-6">890,344 Sales</span>
        </h3>
        <div className="card-toolbar">
          {/* begin::Dropdown */}
          <button
            type="button"
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <KTSVG
              className="svg-icon-1"
              path="/media/icons/stockholm/Layout/Layout-4-blocks-2.svg"
            />
          </button>
          <Dropdown2 />
          {/* end::Dropdown */}
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body pt-0">
        <div
          style={{
            overflow: "hidden",
          }}
          className="d-flex flex-wrap flex-xxl-nowrap justify-content-center justify-content-md-start pt-4"
        >
          {/* begin::Nav */}
          <div
            style={{
              height: "320px",
              overflowY: "auto",
            }}
            className="me-sm-10 me-0 nav-for-table"
          >
            <ul className="nav flex-column nav-pills nav-pills-custom">
              {cats.map((cat, index) => {
                return (
                  <li key={index} className="nav-item mb-3">
                    <a
                      onClick={() => setTab(index)}
                      className={`nav-link w-200px h-70px ${
                        activeTab === `#tab${index}`
                          ? "active btn-active-light"
                          : ""
                      } fw-bolder me-2`}
                      id="tab1"
                    >
                      <div className="nav-icon me-3">
                        <img
                          alt=""
                          src={toAbsoluteUrl("/media/svg/logo/gray/aven.svg")}
                          className="default"
                        />

                        <img
                          alt=""
                          src={toAbsoluteUrl(
                            "/media/svg/logo/colored/aven.svg"
                          )}
                          className="active"
                        />
                      </div>
                      <div className="ps-1">
                        <span className="nav-text text-gray-600 fw-bolder fs-6">
                          {cat}
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* end::Nav */}

          {/* begin::Tab Content */}
          <div
            className="tab-content flex-grow-1" // style={{ paddingLeft: "0.23rem !important" }}
          >
            {/* begin::Tab Pane 1 */}
            <div
              className={`tab-pane fade ${
                activeTab === "#tab1" ? "show active" : ""
              }`}
              id="tab1_content"
            >
              {/* begin::Content */}
              <div className="d-flex justify-content-center mb-10">
                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Sale</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    $650
                  </span>
                </div>
                {/* end::Item */}

                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Commission</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    $2,040
                  </span>
                </div>
                {/* end::Item */}

                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Refers</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    8,926
                  </span>
                </div>
                {/* end::Item */}
              </div>
              {/* end::Content  */}

              {/* begin::Chart */}
              {/* end::Chart      */}
            </div>
            {/* end::Tab Pane 1 */}

            {/* begin::Tab Pane 2 */}
            <div
              className={`tab-pane fade ${
                activeTab === "#tab2" ? "show active" : ""
              }`}
              id="tab2_content"
            >
              {/* begin::Content */}
              <div className="d-flex justify-content-center mb-10">
                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Sale</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    $1250
                  </span>
                </div>
                {/* end::Item */}

                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Commission</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    $5,000
                  </span>
                </div>
                {/* end::Item */}

                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Refers</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    4,926
                  </span>
                </div>
                {/* end::Item */}
              </div>
              {/* end::Content  */}

              {/* begin::Chart */}
              <div id="tab2_chart" style={{ height: "250px" }} />
              {/* end::Chart */}
            </div>
            {/* end::Tab Pane 2 */}

            {/* begin::Tab Pane 3 */}
            <div
              className={`tab-pane fade ${
                activeTab === "#tab3" ? "show active" : ""
              }`}
              id="tab3_content"
            >
              {/* begin::Content */}
              <div className="d-flex justify-content-center mb-10">
                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Sale</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    $350
                  </span>
                </div>
                {/* end::Item */}

                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Comission</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    $1,200
                  </span>
                </div>
                {/* end::Item */}

                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Refers</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    5,500
                  </span>
                </div>
                {/* end::Item */}
              </div>
              {/* end::Content  */}

              {/* begin::Chart */}
              <div id="tab3_chart" style={{ height: "250px" }} />
              {/* end::Chart      */}
            </div>
            {/* end::Tab Pane 3 */}

            {/* begin::Tab Pane 4 */}
            <div
              className={`tab-pane fade ${
                activeTab === "#tab4" ? "show active" : ""
              }`}
              id="tab4_content"
            >
              {/* begin::Content */}
              <div className="d-flex justify-content-center mb-10">
                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Sale</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    $450
                  </span>
                </div>
                {/* end::Item */}

                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Comission</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    $6,500
                  </span>
                </div>
                {/* end::Item */}

                {/* begin::Item */}
                <div className="px-10">
                  <span className="text-muted fw-bold fs-7">Refers</span>
                  <span className="text-gray-800 fw-bolder fs-3 d-block">
                    500
                  </span>
                </div>
                {/* end::Item */}
              </div>
              {/* end::Content  */}

              {/* begin::Chart */}
              <div id="tab4_chart" style={{ height: "250px" }} />
              {/* end::Chart      */}
            </div>
            {/* end::Tab Pane 4 */}
          </div>
          {/* end::Tab Content */}
        </div>
      </div>
      {/* end: Card Body */}
    </div>
  );
};

export { StatsWidget2 };
