import React from "react";
import { PageTitle } from "../../../_start/layout/core";
import { ShipmentDetails } from "./components/shipment-details/ShipmentDetails";

export function ShipmentDashboardPage() {
  return (
    <>
      <PageTitle>Shipment Details</PageTitle>
      <ShipmentDetails />
    </>
  );
}
