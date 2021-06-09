/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { KTSVG } from "../../../../_start/helpers";
import { ShipmentModel } from "../../../data/models/ShipmentModel";
import { getSomeShipments } from "../../../data/api/shipmentsAPI";
import { Link } from "react-router-dom";
import { Spinner } from "../../../../_start/partials/widgets/loading/Spinner";

type Props = {
  className: string;
  innerPadding?: string;
};

const ShipmentsTable: React.FC<Props> = ({ className, innerPadding = "" }) => {
  const [latestShipments, setLatestShipments] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    //load shipments
    getSomeShipments()
      .then(({ data: { shipments } }) => {
        setLoading(false);
        setLatestShipments([...shipments]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={`card ${className}`}>
      {/* <!--begin::Header--> */}
      <div className={`card-header border-0 pt-5 ${innerPadding}`}>
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark fs-3">
            Recent Shipments
          </span>
          <span className="text-muted mt-2 fw-bold fs-6">Orders</span>
        </h3>
        <div className="card-toolbar">
          <ul className="nav nav-pills nav-pills-sm nav-light">
            <li className="nav-item">
              <button className="btn btn-primary py-2 px-4 fw-bolder me-2 ">
                See All
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* <!--end::Header--> */}

      {/* <!--begin::Body--> */}
      <div className="card-body pt-3 pb-0 mt-n3 min-h-200px">
        <div className="tab-content mt-4" id="myTabTables2">
          {/* begin::Tap pane */}
          <div
            id="kt_tab_pane_2_1"
            role="tabpanel"
            aria-labelledby="kt_tab_pane_2_1"
            className="tab-pane fade active show"
          >
            {/* begin::Table */}
            {loading && <Spinner />}
            {!loading && (
              <div className="table-responsive">
                <table className="table table-striped table-borderless align-middle">
                  <thead>
                    <tr>
                      <th className="p-0 w-50px"></th>
                      <th className="p-0 min-w-100px"></th>
                      <th className="p-0 min-w-70px"></th>
                      <th className="p-0 min-w-150px"></th>
                      <th className="p-0 min-w-80px"></th>
                      <th className="p-0 min-w-50px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestShipments.map((shipment: ShipmentModel) => {
                      return (
                        <tr key={shipment.shipmentID}>
                          <th className="px-0 py-3">
                            <div className="symbol symbol-55px me-5">
                              <span className="symbol-label bg-light-success">
                                <KTSVG
                                  path="/media/icons/stockholm/Communication/Group-chat.svg"
                                  className="svg-icon-1 svg-icon-success"
                                />
                              </span>
                            </div>
                          </th>
                          <td className="ps-0">
                            <Link
                              to={`shipment/${shipment.shipmentID}`}
                              className="text-gray-800 fw-bolder text-hover-primary fs-6"
                            >
                              {shipment.name}
                            </Link>
                            <span className="text-muted fw-bold d-block mt-1">
                              {new Date(shipment.updatedAt)
                                .toISOString()
                                .slice(0, 10)}
                            </span>
                          </td>
                          <td className="text-end">
                            <span className="text-gray-800 fw-bolder fs-6">
                              {shipment.numOrders}
                            </span>
                            <span className="text-muted fw-bold d-block mt-1">
                              orders
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="text-dark me-2 fs-6 fw-bolder">
                              {shipment.trackNo}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="text-dark me-2 fs-6 fw-bolder">
                              {shipment.status}
                            </span>
                          </td>
                          <td className="text-end pe-0">
                            <Link
                              to={`shipment/${shipment.shipmentID}`}
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                            >
                              <KTSVG
                                path="/media/icons/stockholm/Navigation/Arrow-right.svg"
                                className="svg-icon-4"
                              />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {/* <!--end::Table--> */}
          </div>
          {/* <!--end::Tap pane--> */}
        </div>
      </div>
    </div>
  );
};

export { ShipmentsTable };
