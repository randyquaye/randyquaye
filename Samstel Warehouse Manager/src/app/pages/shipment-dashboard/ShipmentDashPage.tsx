/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { KTSVG } from "../../../_start/helpers";
import { CurrentOrders } from "./components/CurrentOrders";
import { StatsWidget1, StatsWidget3 } from "../../../_start/partials/widgets";
import {
  getShipment,
  addOrders,
  deleteOrder,
  updateShipment,
} from "../../data/api/shipmentsAPI";
import { ShipmentModel } from "../../data/models/ShipmentModel";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import OrderForm from "./components/OrderForm";

export function ShipmentDashboardPage() {
  const [loading, setLoading] = useState<any>();

  const [shipment, setShipment] = useState<any>();
  const { id } = useParams<any>();

  const [orders, setOrders] = useState<any[]>([]);

  const history = useHistory();

  function redirectHome() {
    history.push("/dashboard");
  }

  const formSchema = Yup.object().shape({
    status: Yup.string().required("Name is required"),
    trackNo: Yup.string(),
  });

  const initialValues = {
    status: "",
    trackNo: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
      setTimeout(() => {
        //add to  orders
        resetForm({});
      }, 500);
    },
  });

  const loadShipment = () => {
    getShipment(id)
      .then(({ data }: any) => {
        console.log(data);
        setShipment(data);
        return data;
      })
      .then((data) => {
        if (!shipment) {
          formik.setFieldValue("trackNo", data.trackNo);
          formik.setFieldValue("status", data.status);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //load shipments
    loadShipment();
  }, []);

  const addNewOrder = (order: any) => {
    setOrders([...orders, order]);
  };

  const removeNewOrder = (orderID: string) => {
    setOrders(
      orders.filter((order) => {
        return order.modelNo !== orderID;
      })
    );
  };

  const removeOldOrder = (orderID: string) => {
    setLoading(true);
    deleteOrder(id, orderID).then(() => {
      let newOrders = shipment.orders.filter((order: any) => {
        return order.id !== orderID;
      });

      let newShipment = {
        ...shipment,
        orders: newOrders,
        numOrders: --shipment.numOrders,
      };
      setShipment(newShipment);
      setLoading(false);
    });
  };

  const doSave = async () => {
    await save();
    setOrders([]);
    loadShipment();
  };

  const save = async () => {
    if (orders.length > 0) {
      //update orders
      await addOrders(id, orders)
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (
      !(formik.values.trackNo == shipment.trackNo) ||
      !(formik.values.status == shipment.status)
    ) {
      //update titles
      await updateShipment({ details: formik.values, shipmentID: id })
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //add loading indicator instead of null
  return !shipment ? null : (
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
            <div className="card-toolbar"></div>
          </div>
          <div className="card-body">
            <form action="">
              <div className="row d-flex flex-row">
                <div className="col-md-6">
                  <input
                    type="text"
                    {...formik.getFieldProps("trackNo")}
                    onChange={(e) => {
                      formik.setFieldValue("trackNo", e.target.value);
                      formik.setFieldTouched("trackNo", true);
                    }}
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
                  />
                </div>
                <div className="col-md-6">
                  <select
                    {...formik.getFieldProps("status")}
                    onChange={(e) => {
                      formik.setFieldValue("status", e.target.value);
                      formik.setFieldTouched("status", true);
                    }}
                    className="form-select form-select-solid"
                    aria-label="Select Status"
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
            removeOrder={removeOldOrder}
          />
        </div>
      </div>
      {/* end::Row */}

      <div className="row g-0 g-xl-12 mb-5">
        <OrderForm
          orderList={orders}
          addOrder={addNewOrder}
          removeOrder={removeNewOrder}
        ></OrderForm>
      </div>

      {((formik.touched.trackNo &&
        !(formik.values.trackNo == shipment.trackNo)) ||
        (formik.touched.status && !(formik.values.status == shipment.status)) ||
        orders.length > 0) && (
        <div className="row g-0 g-md-5 g-xxl-8">
          <button
            onClick={doSave}
            className="nav-link btn btn-primary py-2 px-4 fw-bolder me-2"
          >
            {!loading && <span className="indicator-label">SAVE CHANGES</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...&nbsp;
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      )}
    </>
  );
}
