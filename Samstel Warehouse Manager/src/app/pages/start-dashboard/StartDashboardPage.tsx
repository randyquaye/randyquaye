/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { ShipmentsTable } from "./components/ShipmentsTable";
import { EngageWidget5 } from "../../../_start/partials/widgets";
import { Link } from "react-router-dom";
import { InventoryTable } from "./components/InventoryTable";

export const StartDashboardPage: React.FC = () => {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);
  return (
    <>
      {/* begin::Row */}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-4">
          <EngageWidget5 className="card-stretch mb-5 mb-xxl-8">
            {/* begin::Action */}
            <div className="text-center pt-7">
              <Link
                to="/shipment"
                className="btn btn-primary fw-bolder fs-6 px-7 py-3"
              >
                Add Shipment
              </Link>
            </div>
            {/* end::Action */}
          </EngageWidget5>
        </div>

        <div className="col-xl-8">
          <ShipmentsTable className="card-stretch mb-5 mb-xxl-8" />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-12">
          <InventoryTable className="card-stretch mb-5 mb-xxl-8" />
        </div>
      </div>
      {/* end::Row */}
    </>
  );
};
