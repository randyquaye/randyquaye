/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { toAbsoluteUrl } from "../../../../_start/helpers";
import { KTSVG } from "../../../../_start/helpers";
import { getSomeProducts } from "../../../data/api/inventoryAPI";

type Props = {
  className: string;
  innerPadding?: string;
};

const InventoryTable: React.FC<Props> = ({ className, innerPadding = "" }) => {
  const [latestProducts, setLatestProducts] = useState<any>([]);

  useEffect(() => {
    //load shipments
    getSomeProducts()
      .then(({ data: { products } }) => {
        console.log(products);
        setLatestProducts([...products]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className={`card-header border-0 pt-5 ${innerPadding}`}>
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark fs-3">
            Latest Stock Counts
          </span>
          <span className="text-muted mt-2 fw-bold fs-6">890 Updates</span>
        </h3>
        <div className="card-toolbar">
          <ul className="nav nav-pills nav-pills-sm nav-light">
            <li className="nav-item">
              <a
                className="nav-link btn btn-active-light btn-color-muted py-2 px-4 fw-bolder me-2 active"
                data-bs-toggle="tab"
                href="#inventory_tab_pane_2_1"
              >
                All
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-active-light btn-color-muted py-2 px-4 fw-bolder me-2"
                data-bs-toggle="tab"
                href="#kt_tab_pane_2_2"
              >
                Low Stock
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link btn btn-primary py-2 px-4 fw-bolder me-2"
                href=""
              >
                Update Count
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body pt-3 pb-0 mt-n3">
        <div className="tab-content mt-4" id="myTabTables2">
          {/* begin::Tap pane */}
          <div
            id="inventory_tab_pane_2_1"
            role="tabpanel"
            aria-labelledby="inventory_tab_pane_2_1"
            className="tab-pane fade active show"
          >
            {/* begin::Table */}
            <div className="table-responsive">
              <table className="table table-borderless align-middle">
                <thead>
                  <tr>
                    <th className="p-0 w-50px"></th>
                    <th className="p-0 min-w-150px"></th>
                    <th className="p-0 min-w-120px"></th>
                    <th className="p-0 min-w-70px"></th>
                    <th className="p-0 min-w-70px"></th>
                    <th className="p-0 min-w-50px"></th>
                  </tr>
                </thead>
                <tbody>
                  {latestProducts.map((product: any) => {
                    return (
                      <tr key={product.productID}>
                        <td className="px-0 py-3">
                          <div className="symbol symbol-55px mt-1 me-5">
                            <span className="symbol-label bg-light-primary align-items-end">
                              <img
                                alt="Logo"
                                src={toAbsoluteUrl(
                                  "/media/svg/avatars/001-boy.svg"
                                )}
                                className="mh-40px"
                              />
                            </span>
                          </div>
                        </td>
                        <td className="px-0">
                          <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                            {product.name}
                          </a>
                          <span className="text-muted fw-bold d-block mt-1">
                            {product.category}
                          </span>
                        </td>

                        <td className="text-end">
                          <span className="text-gray-800 fw-bolder d-block fs-6">
                            {product.ctnQty}
                          </span>
                          <span className="text-muted fw-bold d-block mt-1 fs-7">
                            ctns
                          </span>
                        </td>

                        <td className="text-end">
                          <span className="text-gray-800 fw-bolder d-block fs-6">
                            {product.onHold ? "Out Stock" : "In Stock"}
                          </span>
                          <span className="text-muted fw-bold d-block mt-1 fs-7"></span>
                        </td>
                        <td className="text-end">
                          <span className="fw-bolder text-primary">+28%</span>
                        </td>
                        <td className="text-end pe-0">
                          <a className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                            <KTSVG
                              className="svg-icon-4"
                              path="/media/icons/stockholm/Navigation/Arrow-right.svg"
                            />
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

          {/* begin::Tap pane */}
          <div
            id="inventory_tab_pane_2_2"
            role="tabpanel"
            aria-labelledby="inventory_tab_pane_2_2"
            className="tab-pane fade"
          >
            {/* begin::Table */}

            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
};

export { InventoryTable };
