import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { OrderModel } from "../models/OrderModel";
import NewOrders from "./NewOrders";

function OrderForm(props: any) {
  const [loading, setLoading] = useState(false);

  const orderSchema = Yup.object().shape({
    productName: Yup.string().required("Name is required"),
    perCtn: Yup.number().required("Box Qty is required").moreThan(0),
    quantity: Yup.number().required("Quantity is required").moreThan(0),
    category: Yup.string().required("Category is required"),
    price: Yup.number().required("Price is required").moreThan(0),
    modelNo: Yup.string().required("Model No. is required"),
  });

  const initialValues: OrderModel = {
    productName: "",
    perCtn: 0,
    quantity: 0,
    category: "",
    shipmentID: "",
    price: 0,
    modelNo: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: orderSchema,
    onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
      setLoading(true);
      setTimeout(() => {
        //add to new orders
        props.addOrder(values);
        setLoading(false);
        resetForm({});
      }, 500);
    },
  });

  let handleDelete = (orderID: string) => {
    props.removeOrder(orderID);
  };

  return (
    <>
      <div className="row g-0 g-xl-12">
        <div className="card">
          <div className={`card-header border-0 pt-5 pb-5`}>
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder text-dark fs-3">
                Add New Order
              </span>
              <span className="text-muted mt-2 fw-bold fs-6">
                to this shipment
              </span>
            </h3>
          </div>
          {/* end::Header */}
          <div className="card-body pt-3 pb-0 mt-n3">
            <div className="col-xl-12">
              <form onSubmit={formik.handleSubmit} noValidate id="orderForm">
                <div className="row">
                  <div className="mb-10 col-md-3">
                    <select
                      className="form-select form-select-solid"
                      aria-label="Select example"
                      {...formik.getFieldProps("category")}
                    >
                      <option value="" disabled>
                        Category
                      </option>
                      <option value="Blenders">Blenders</option>
                      <option value="Cookware">Cookware</option>
                      <option value="Irons">Irons</option>
                    </select>
                  </div>

                  <div className="mb-10 col-md-6">
                    <input
                      autoComplete="off"
                      type="text"
                      {...formik.getFieldProps("productName")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.productName &&
                            formik.errors.productName,
                        },
                        {
                          "is-valid":
                            formik.touched.productName &&
                            !formik.errors.productName,
                        }
                      )}
                      placeholder="Product Name"
                    />
                  </div>

                  <div className="mb-10 col-md-3">
                    <input
                      autoComplete="off"
                      type="text"
                      {...formik.getFieldProps("modelNo")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.modelNo && formik.errors.modelNo,
                        },
                        {
                          "is-valid":
                            formik.touched.modelNo && !formik.errors.modelNo,
                        }
                      )}
                      placeholder="Model Number"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className=" mb-10 col-md-4">
                    <input
                      autoComplete="off"
                      type="number"
                      {...formik.getFieldProps("quantity")}
                      value={
                        formik.values.quantity == 0
                          ? ""
                          : formik.getFieldProps("quantity").value
                      }
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.quantity && formik.errors.quantity,
                        },
                        {
                          "is-valid":
                            formik.touched.quantity && !formik.errors.quantity,
                        }
                      )}
                      placeholder="Quantity (ctns)"
                    />
                  </div>

                  <div className=" mb-10 col-md-4">
                    <input
                      autoComplete="off"
                      type="number"
                      {...formik.getFieldProps("perCtn")}
                      value={
                        formik.values.perCtn == 0
                          ? ""
                          : formik.getFieldProps("perCtn").value
                      }
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.perCtn && formik.errors.perCtn,
                        },
                        {
                          "is-valid":
                            formik.touched.perCtn && !formik.errors.perCtn,
                        }
                      )}
                      placeholder="Units per Ctn"
                    />
                  </div>

                  <div className=" mb-10 col-md-4">
                    <input
                      autoComplete="off"
                      type="number"
                      {...formik.getFieldProps("price")}
                      value={
                        formik.values.price == 0
                          ? ""
                          : formik.getFieldProps("price").value
                      }
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.price && formik.errors.price,
                        },
                        {
                          "is-valid":
                            formik.touched.price && !formik.errors.price,
                        }
                      )}
                      placeholder="Price($)"
                    />
                  </div>
                </div>
                <div className="pb-lg-0 pb-5">
                  <button
                    type="submit"
                    id="kt_login_signin_form_submit_button"
                    className="btn btn-primary fw-bolder fs-6 px-8 py-4 my-3 me-3"
                    disabled={
                      formik.isSubmitting || !formik.isValid || !formik.dirty
                    }
                  >
                    {!loading && <span className="indicator-label">Add</span>}
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 row g-0 g-xl-12">
        <NewOrders
          orders={props.orderList}
          handleDelete={handleDelete}
        ></NewOrders>
      </div>
    </>
  );
}

export default OrderForm;
