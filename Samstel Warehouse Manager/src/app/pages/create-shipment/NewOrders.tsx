import React from "react";
import PropTypes from "prop-types";
import { KTSVG, toAbsoluteUrl } from "../../../_start/helpers";
import { OrderModel } from "../create-shipment/models/OrderModel";

interface Props {}

const NewOrders = (props: any) => {
  const orders = props.orders;

  let doDelete = (orderID: string) => {
    if (window.confirm("Are you sure you want to delete this order")) {
      props.handleDelete(orderID);
    }
  };

  return (
    <>
      <div className={`card`}>
        {/* begin::Header */}
        <div className={`card-header border-0 pt-5`}>
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder text-dark fs-3">
              New Orders
            </span>
            <span className="text-muted mt-2 fw-bold fs-6">
              for this shipment
            </span>
          </h3>
          <div className="card-toolbar"></div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body pt-3 pb-0 mt-n3">
          <div className="tab-content mt-4" id="myTabTables2">
            {/* begin::Tap pane */}
            <div
              id="kt_tab_pane_2_1"
              role="tabpanel"
              aria-labelledby="kt_tab_pane_2_1"
              className="tab-pane fade active show"
            >
              {orders.length == 0 &&
                "Add New orders to the shipment to see them here"}
              {/* begin::Table */}
              <div className="table-responsive">
                <table className="table table-borderless align-middle">
                  <thead>
                    <tr>
                      <th className="p-0 min-w-150px"></th>
                      <th className="p-0 min-w-80px"></th>
                      <th className="p-0 min-w-60px"></th>
                      <th className="p-0 min-w-60px"></th>
                      <th className="p-0 min-w-60px"></th>
                      <th className="p-0 min-w-50px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order: any) => {
                      return (
                        <tr key={order.modelNo}>
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
                          <td className="text-end pe-0">
                            <a
                              key={order.modelNo}
                              onClick={() => doDelete(order.modelNo)}
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
              {/* end::Table */}
            </div>
            {/* end::Tap pane */}
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  );
};

export default NewOrders;
