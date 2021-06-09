/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { KTSVG } from "../../../../../_start/helpers";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { PageTitle } from "../../../../../_start/layout/core";
import { areProductsEqual, defaultProduct, IProduct } from "./ProductModel";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../../../data/api/inventoryAPI";
import { useLoading, Bars } from "@agney/react-loading";
import { Spinner } from "../../../../../_start/partials/widgets/loading/Spinner";
import FormImpl from "react-bootstrap-v5/lib/esm/Form";
import { set } from "object-path";

export function ProductDetails() {
  const [enableDelete, setEnableDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const { id } = useParams<any>();
  const history = useHistory();

  const _deleteProduct = () => {
    deleteProduct(id)
      .then(() => {
        console.log("Delete Successful");
        history.push("/dashboard");
      })
      .catch((e) => {});
  };

  const loadProduct = () => {
    getProduct(id)
      .then(({ data }: any) => {
        formik.initialValues = data as IProduct;
        setProduct(data);
        setLoading(false);
        return data;
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //load shipments
    loadProduct();
  }, []);

  useEffect(() => {}, []);

  const productSchema = Yup.object().shape({
    name: Yup.string().required("Name required"),
    modelNo: Yup.string().required("Model Number required"),
    factoryPrice: Yup.number()
      .required("Factory price required")
      .max(345, "Can't be higher than initial value"),
    category: Yup.string().required("Model Number required"),
    retailPrice: Yup.number().required("Retail price required"),
    perCtn: Yup.number().required("Qty per Ctn required"),
    ctnQty: Yup.number().required("Ctn Quantity required"),
    onHold: Yup.boolean().required("Please check an option"),
    stockCount: Yup.number().required("Stock Count required"),
    reorderLevel: Yup.number().required("Re-order Level required"),
  });

  const formik = useFormik({
    initialValues: product,
    enableReinitialize: true,
    validationSchema: productSchema,
    onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
      //Update Product
      console.log("submitting");
      updateProduct(values as Partial<IProduct>, id).then(() => {
        loadProduct();
        setLoading(false);
      });
    },
  });

  const toggleDelete = () => {
    setEnableDelete(!enableDelete);
  };

  return (
    <>
      <PageTitle>Product Details</PageTitle>
      {/* <TransparentLoader /> */}
      {loading && <Spinner />}
      <div className="card">
        {/* begin::Form */}

        {!loading && (
          <form
            onSubmit={formik.handleSubmit}
            className="form d-flex flex-center"
            id="productForm"
          >
            <div className="card-body mw-800px py-5 px-10">
              {/* begin::Form row */}
              <div className="row">
                <div className="mb-10 col-md-12">
                  <label className="form-label">Product Name</label>

                  <input
                    autoComplete="off"
                    type="text"
                    {...formik.getFieldProps("name")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid",
                      {
                        "is-invalid": formik.touched.name && formik.errors.name,
                      },
                      {
                        "is-valid": formik.touched.name && !formik.errors.name,
                      }
                    )}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              {/* end::Form row */}

              {/* begin::Form row */}
              <div className="row">
                <div className="mb-10 col-md-6">
                  <label className="form-label">Category</label>

                  <select
                    className="form-select form-control-lg form-select-solid"
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
                  <label className="form-label">Model No.</label>

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
              {/* end::Form row */}

              {/* begin::Form row */}
              <div className="row">
                <div className="mb-10 col-md-4">
                  <label className="form-label">Stock Count</label>
                  <div className="input-group input-group-lg input-group-solid">
                    <span className="input-group-text pe-0">
                      <i className="la la-gem fs-4"></i>
                    </span>
                    <input
                      autoComplete="off"
                      type="text"
                      {...formik.getFieldProps("stockCount")}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "stockCount",
                          Number(e.target.value)
                        );

                        formik.setFieldValue(
                          "ctnQty",
                          Number(e.target.value) / formik.values.perCtn
                        );
                      }}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.stockCount &&
                            formik.errors.stockCount,
                        },
                        {
                          "is-valid":
                            formik.touched.stockCount &&
                            !formik.errors.stockCount,
                        }
                      )}
                      placeholder="Stock Count"
                    />
                  </div>
                </div>

                <div className="mb-10 col-md-4">
                  <label className="form-label">No. of Ctns</label>

                  <div className="input-group input-group-lg input-group-solid">
                    <span className="input-group-text pe-0">
                      <i className="la la-gem fs-4"></i>
                    </span>
                    <input
                      autoComplete="off"
                      type="text"
                      {...formik.getFieldProps("ctnQty")}
                      onChange={(e) => {
                        formik.setFieldValue("ctnQty", Number(e.target.value));
                        formik.setFieldValue(
                          "stockCount",
                          Number(e.target.value) * formik.values.perCtn
                        );
                      }}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.ctnQty && formik.errors.ctnQty,
                        },
                        {
                          "is-valid":
                            formik.touched.ctnQty && !formik.errors.ctnQty,
                        }
                      )}
                      placeholder="Ctn Quantity"
                    />
                  </div>
                </div>

                <div className="mb-10 col-md-4">
                  <label className="form-label">Re-order Level</label>
                  <div className="input-group input-group-lg input-group-solid">
                    <span className="input-group-text pe-0">
                      <i className="la la-level-up fs-4"></i>
                    </span>
                    <input
                      autoComplete="off"
                      type="text"
                      {...formik.getFieldProps("reorderLevel")}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "reorderLevel",
                          Number(e.target.value)
                        );
                      }}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.reorderLevel &&
                            formik.errors.reorderLevel,
                        },
                        {
                          "is-valid":
                            formik.touched.reorderLevel &&
                            !formik.errors.reorderLevel,
                        }
                      )}
                      placeholder="Reorder Level"
                    />
                  </div>
                </div>
              </div>
              {/* end::Form row */}

              {/* begin::Form row */}
              <div className="row">
                <div className="mb-10 col-md-6">
                  <label className="form-label">Factory Price</label>
                  <div className="input-group input-group-lg input-group-solid">
                    <span className="input-group-text pe-0">
                      <i className="la la-dollar-sign fs-4"></i>
                    </span>
                    <input
                      autoComplete="off"
                      type="text"
                      {...formik.getFieldProps("factoryPrice")}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "factoryPrice",
                          Number(e.target.value)
                        );
                      }}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.factoryPrice &&
                            formik.errors.factoryPrice,
                        },
                        {
                          "is-valid":
                            formik.touched.factoryPrice &&
                            !formik.errors.factoryPrice,
                        }
                      )}
                      placeholder="Factory Price"
                    />
                  </div>
                </div>

                <div className="mb-10 col-md-6">
                  <label className="form-label">Retail Price</label>

                  <div className="input-group input-group-lg input-group-solid">
                    <span className="input-group-text pe-0">
                      <i className="la la-dollar-sign fs-4"></i>
                    </span>
                    <input
                      autoComplete="off"
                      type="text"
                      {...formik.getFieldProps("retailPrice")}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "retailPrice",
                          Number(e.target.value)
                        );
                      }}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.retailPrice &&
                            formik.errors.retailPrice,
                        },
                        {
                          "is-valid":
                            formik.touched.retailPrice &&
                            !formik.errors.retailPrice,
                        }
                      )}
                      placeholder="Retail Price"
                    />
                  </div>
                </div>
              </div>
              {/* end::Form row */}

              <div className="row">
                <div className=" col-md-12">
                  <div className="form-text">
                    You can toggle this to hold the stock and prevent inventory
                    from being dispatched. This means the product will be
                    essentially out of stock &nbsp;
                    <a href="#" className="fw-bold">
                      Learn more
                    </a>
                    .
                  </div>

                  <div className="mt-10 form-check form-switch form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      {...formik.getFieldProps("onHold")}
                      checked={formik.values.onHold}
                      id="flexSwitchDefault"
                    />
                    <label
                      className="form-check-label"
                      arial-for="flexSwitchDefault"
                    >
                      Hold Stock
                    </label>
                  </div>
                </div>
              </div>

              <div className="separator separator-dashed my-10"></div>

              {/* begin::Form row */}
              <div className="row mb-0">
                <label className="col-lg-3 col-form-label">
                  Delete Product From Inventory
                </label>
                <div className="col-lg-9">
                  <div className="form-check form-check-custom form-check-solid me-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="customCheck5"
                      checked={enableDelete}
                      onChange={() => toggleDelete()}
                    />
                    <label
                      className="form-check-label fw-bold"
                      htmlFor="customCheck5"
                    >
                      I acknowledge that action cannot be undone once confirmed
                    </label>
                  </div>

                  <div className="form-text py-2">
                    For extra security, this requires you to confirm privileged
                    access to Samstel Inventory. &nbsp;
                    <a href="#" className="fw-boldk">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row row mb-5">
                <div className="d-flex justify-content-between">
                  <button
                    disabled={!enableDelete}
                    type="button"
                    className="mt-10 btn btn-light-danger fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target="#confirm_modal_1"
                  >
                    Delete Product
                  </button>

                  <button
                    type="submit"
                    form="productForm"
                    disabled={!formik.dirty || !formik.isValid}
                    className="mt-10 btn btn-primary fw-bold"
                  >
                    Update Product
                    {loading && (
                      <span
                        className="indicator-progress"
                        style={{ display: "block" }}
                      >
                        Please wait...&nbsp;
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
              {/* end::Form row */}
            </div>
          </form>
        )}
        {/* end::Form */}
      </div>

      <div className="modal fade" tabIndex={-1} id="confirm_modal_1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header pt-5 pb-0">
              <h5 className="modal-title">Delete Product</h5>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <KTSVG
                  path="/media/icons/duotone/Navigation/Close.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this product?</p>
            </div>
            <div className="modal-footer pt-1 pb-1">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={_deleteProduct}
                type="button"
                className="btn btn-primary"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
