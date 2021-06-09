/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { KTSVG, toAbsoluteUrl } from "../../../../../_start/helpers";
import { Dropdown2 } from "../../../../../_start/partials/content/dropdown/Dropdown2";

type Props = {
  className: string;
  orders: any[];
  removeOrder: any;
  innerPadding?: string;
};

const CurrentOrders: React.FC<Props> = ({
  className,
  innerPadding = "",
  removeOrder,
  orders = [],
}) => {
  const [activeTab, setActiveTab] = useState("#tab1");
  useEffect(() => {
    setTab(1);
  }, []);

  const setTab = (tabNumber: number) => {
    setActiveTab(`#tab${tabNumber}`);
  };

  const handleDelete = (orderID: string) => {
    removeOrder(orderID);
  };

  const cats = ["red", "yel", "gre", "blu", "bla"];

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header align-items-center border-0 mt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bolder text-dark fs-3">Saved Orders</span>
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
        {/* end: Card Body */}
        <div className="table-responsive">
          <table className="table table-borderless align-middle">
            <thead>
              <tr>
                <th className="p-0 min-w-120px"></th>
                <th className="p-0 min-w-80px"></th>
                <th className="p-0 min-w-60px"></th>
                <th className="p-0 min-w-60px"></th>
                <th className="p-0 min-w-60px"></th>
                <th className="p-0 min-w-60px"></th>
                <th className="p-0 min-w-50px"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => {
                return (
                  <tr key={order.id}>
                    <td className="px-0">
                      <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                        {order.productName}
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        {order.category}
                      </span>
                    </td>
                    <td className="px-0">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        {order.modelNo}
                      </span>
                      <span className="text-muted fw-bold d-block mt-1">
                        Model No.
                      </span>
                    </td>

                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        {order.quantity}
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        ctns
                      </span>
                    </td>

                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        {order.perCtn}
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        /ctn
                      </span>
                    </td>

                    <td className="text-end">
                      <span className="fw-bolder text-gray-800">
                        ${order.price}
                      </span>
                      <span className="text-muted fw-bold d-block mt-1">
                        &nbsp;
                      </span>
                    </td>

                    <td className="text-end">
                      <span className="fw-bolder text-gray-800">
                        ${order.totalCost ? order.totalCost : null}
                      </span>
                      <span className="text-muted fw-bold d-block mt-1">
                        &nbsp;
                      </span>
                    </td>
                    <td className="text-end pe-0">
                      <a
                        key={order.id}
                        onClick={() => handleDelete(order.id)}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <i className="fas fa-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function editOrder(orderID: string) {}

export { CurrentOrders };
