import React, { useRef, useState } from "react";
import { KTSVG, toAbsoluteUrl } from "../../../_start/helpers";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";
import clsx from "clsx";
import { addShipment } from "./data/ShipmentCRUD";
import { ShipmentModel } from "./models/ShipmentModel";
import { OrderModel } from "./models/OrderModel";
import NewOrders from "./NewOrders";
import OrderForm from "./OrderForm";
import { Link, useHistory } from "react-router-dom";

export function CreateShipmentPage() {
  const history = useHistory();

  function redirectHome() {
    history.push("/dashboard");
  }

  function docancel(event: any) {
    event.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to cancel? All unsaved changes will be lost"
      )
    )
      redirectHome();
  }

  const [loading, setLoading] = useState(false);

  const start: OrderModel[] = [];
  const [orders, setOrders] = useState(start);

  const shipmentSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Maximum 50 symbols")
      .required("Name is required"),
    trackNo: Yup.string(),
    status: Yup.string().required("Status is Required"),
  });

  const initialValues = {
    name: "",
    trackNo: "",
    status: "Ordering",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: shipmentSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        console.log("Submitting...");
        addShipment({ ...values, orders: [...orders] } as ShipmentModel)
          .then(() => {
            setLoading(false);
            redirectHome();
          })
          .catch(() => {
            setLoading(false);
            setSubmitting(false);
            setStatus("");
          });
      }, 1000);
    },
  });

  const addNewOrder = (order: OrderModel) => {
    setOrders([...orders, order]);
  };

  const removeNewOrder = (orderID: string) => {
    setOrders(
      orders.filter((order) => {
        return order.modelNo !== orderID;
      })
    );
  };

  return (
    <>
      <div className="row g-0 g-xl-12 mb-5">
        <div className="card">
          <div className={`card-header border-0 pt-5`}>
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder text-dark fs-3">
                Shipment Details
              </span>
            </h3>
            <div className="card-toolbar">
              <ul className="nav nav-pills nav-pills-sm nav-light">
                <li className="nav-item">
                  <a
                    className="nav-link btn btn-danger py-2 px-4 fw-bolder me-2"
                    onClick={docancel}
                  >
                    Cancel
                  </a>
                </li>

                <li className="nav-item">
                  <button
                    type="submit"
                    form="shipmentForm"
                    className="nav-link btn btn-primary py-2 px-4 fw-bolder me-2"
                    disabled={
                      formik.isSubmitting ||
                      !formik.isValid ||
                      !formik.dirty ||
                      orders.length < 1
                    }
                  >
                    {!loading && <span className="indicator-label">Save</span>}
                    {loading && (
                      <span
                        className="indicator-progress"
                        style={{ display: "block" }}
                      >
                        Please wait...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* end::Header */}
          <div className="card-body pt-3 pb-0 mt-n3">
            <div className="col-xl-12">
              <div className="d-flex flex-row">
                <div className="me-10 form-check form-check-custom form-check-solid form-check-sm">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...formik.getFieldProps("status")}
                    value="Ordering"
                    checked={formik.values.status === "Ordering"}
                    id="orderingRadio"
                  />
                  <label className="form-check-label" htmlFor="orderingRadio">
                    Ordering
                  </label>
                </div>
                <div className="me-10 form-check form-check-custom form-check-solid form-check-sm">
                  <input
                    {...formik.getFieldProps("status")}
                    className="form-check-input"
                    type="radio"
                    value="En Route"
                    id="enrouteRadio"
                  />
                  <label className="form-check-label" htmlFor="enrouteRadio">
                    En Route
                  </label>
                </div>
                <div className="me-10 form-check form-check-custom form-check-solid form-check-sm">
                  <input
                    {...formik.getFieldProps("status")}
                    className="form-check-input"
                    type="radio"
                    value="Delivered"
                    id="deliveredRadio"
                  />
                  <label className="form-check-label" htmlFor="deliveredRadio">
                    Delivered
                  </label>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <form onSubmit={formik.handleSubmit} noValidate id="shipmentForm">
                <div className="row">
                  <div className="mt-5 mb-10 col-md-6">
                    <input
                      {...formik.getFieldProps("name")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.name && formik.errors.name,
                        },
                        {
                          "is-valid":
                            formik.touched.name && !formik.errors.name,
                        }
                      )}
                      type="text"
                      placeholder="Name"
                    />
                  </div>

                  <div className="mt-5 mb-10 col-md-6">
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
                      placeholder="Tracking Number"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-0 g-xl-12 mb-5">
        <OrderForm
          orderList={orders}
          addOrder={addNewOrder}
          removeOrder={removeNewOrder}
        ></OrderForm>
      </div>
    </>
  );
}
