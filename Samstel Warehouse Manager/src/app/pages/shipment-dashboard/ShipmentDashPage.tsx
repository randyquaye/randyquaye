/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { KTSVG } from "../../../_start/helpers";
import { CurrentOrders } from "./components/CurrentOrders";
import { StatsWidget1, StatsWidget3 } from "../../../_start/partials/widgets";
import { getShipment } from "../../data/api/shipmentsAPI";
import { ShipmentModel } from "../../data/models/ShipmentModel";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";

export function ShipmentDashboardPage() {
  const [shipment, setShipment] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<any>();

  const formSchema = Yup.object().shape({
    status: Yup.string().required("Name is required"),
    trackNo: Yup.string(),
  });

  const initialValues = {
    status: shipment?.status,
    trackNo: shipment?.trackNo,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
      setLoading(true);
      setTimeout(() => {
        //add to  orders
        setLoading(false);
        resetForm({});
      }, 500);
    },
  });

  useEffect(() => {
    //load shipments
    getShipment(id)
      .then(({ data }: any) => {
        console.log(data);
        setShipment(data);
        setLoading(false);
      })
      .then(() => {
        formik.setFieldValue("trackNo", shipment?.trackNo);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  //add loading indicator instead of null
  return loading ? null : (
    <>
      {/* begin::Row */}
      <div className="row g-0 g-md-5 g-xxl-8">
        <div className="card mb-5">
          <div className="card-header border-0 mt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="fw-bolder text-muted fs-4">
                Shipment Dashboard
              </span>
              <span className="fw-bold text-dark fs-3 mt-5">
                {shipment?.name}
              </span>
            </h3>
            <div className="card-toolbar">
              <button
                type="button"
                className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="top-end"
              >
                <KTSVG
                  path="/media/icons/stockholm/Design/Edit.svg"
                  className="svg-icon-1"
                />
              </button>
            </div>
          </div>
          <div className="card-body">
            <form action="">
              <div className="row d-flex flex-row">
                <div className="col-md-6">
                  <input
                    type="text"
                    {...formik.getFieldProps("trackNo")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid":
                          formik.touched.trackNo && formik.errors.trackNo,
                      },
                      {
                        "is-valid":
                          formik.touched.trackNo && !formik.errors.trackNo,
                      }
                    )}
                    // readOnly={true}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select form-select-solid"
                    aria-label="Select Status"
                    {...formik.getFieldProps("status")}
                  >
                    <option value="Ordering">Ordering</option>
                    <option value="En Route">En Route</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* begin::Row */}
      <div className="row g-0 g-md-5 g-xxl-8">
        <div className="col-md-4">
          <StatsWidget3
            data={{
              title: `$${shipment?.shipmentCost}`,
              info: "Total Shipment Cost",
            }}
            className="card-stretch mb-5  mb-xxl-8 bg-primary"
          />
        </div>

        <div className="col-md-4">
          <StatsWidget3
            data={{
              title: `${shipment?.noCtns} ctns`,
              info: "Total No. of Ctns",
            }}
            className="card-stretch mb-5  mb-xxl-8 bg-warning"
          />
        </div>

        <div className="col-md-4">
          <StatsWidget3
            data={{
              title: `${shipment?.numOrders} orders`,
              info: "Total No. of Orders",
            }}
            className="card-stretch mb-5  mb-xxl-8 bg-success"
          />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className="row g-0 g-xl-5 g-xxl-8">
        <div className="col-xl-4">
          <StatsWidget1
            chartData={shipment?.pricePerCat}
            className="card-stretch mb-5 mb-xxl-8"
          />
        </div>

        <div className="col-xl-8">
          <CurrentOrders
            orders={shipment?.orders}
            className="card-stretch mb-5 mb-xxl-8"
          />
        </div>
      </div>
      {/* end::Row */}

      <div className="row g-0 g-md-5 g-xxl-8">
        <button className="nav-link btn btn-primary py-2 px-4 fw-bolder me-2">
          {!loading && <span className="indicator-label">ADD ORDER</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
    </>
  );
}
