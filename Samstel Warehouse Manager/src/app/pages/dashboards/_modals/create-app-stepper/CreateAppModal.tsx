/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap-v5";
import { StepperComponent } from "../../../../../_start/assets/ts/components";
import { KTSVG } from "../../../../../_start/helpers";
import { toAbsoluteUrl } from "../../../../../_start/helpers";
import { defaultCreateAppData, ICreateAppData } from "./IAppModels";

type Props = {
  show: boolean;
  handleClose: () => void;
};

const CreateAppModal: React.FC<Props> = ({ show, handleClose }) => {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const stepper = useRef<StepperComponent | null>(null);
  const [data, setData] = useState<ICreateAppData>(defaultCreateAppData);
  const [hasError, setHasError] = useState(false);

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(
      stepperRef.current as HTMLDivElement
    );
  };

  const updateData = (fieldsToUpdate: Partial<ICreateAppData>) => {
    const updatedData = { ...data, ...fieldsToUpdate };
    setData(updatedData);
  };

  const checkAppBasic = (): boolean => {
    if (!data.appBasic.appName || !data.appBasic.appType) {
      return false;
    }
    return true;
  };

  const checkAppDataBase = (): boolean => {
    if (!data.appDatabase.databaseName || !data.appDatabase.databaseSolution) {
      return false;
    }

    return true;
  };

  const prevStep = () => {
    if (!stepper.current) {
      return;
    }

    stepper.current.goPrev();
  };

  const nextStep = () => {
    setHasError(false);
    if (!stepper.current) {
      return;
    }

    if (stepper.current.getCurrentStepIndex() === 1) {
      if (!checkAppBasic()) {
        setHasError(true);
        return;
      }
    }

    if (stepper.current.getCurrentStepIndex() === 3) {
      if (!checkAppDataBase()) {
        setHasError(true);
        return;
      }
    }

    stepper.current.goNext();
  };

  const submit = () => {
    window.location.reload();
  };

  return (
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog-centered mw-1000px h-auto"
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
    >
      <div className="container px-10 py-10">
        <div className="modal-header py-2 d-flex justify-content-end border-0">
          {/* begin::Close */}
          <div
            className="btn btn-icon btn-sm btn-light-primary"
            onClick={handleClose}
          >
            <KTSVG
              className="svg-icon-2"
              path="/media/icons/stockholm/Navigation/Close.svg"
            />
          </div>
          {/* end::Close */}
        </div>

        <div className="modal-body">
          {/*begin::Stepper */}
          <div
            ref={stepperRef}
            className="stepper stepper-1 d-flex flex-column flex-xl-row flex-row-fluid"
            id="kt_modal_create_app_stepper"
          >
            {/*begin::Aside */}
            
            {/*begin::Aside */}

            {/*begin::Content */}
            <div className="d-flex flex-row-fluid justify-content-center">
              {/*begin::Form */}
              <form
                className="pb-5 w-100 w-md-400px w-xl-500px"
                noValidate
                id="kt_modal_create_app_form"
              >
                {/*begin::Step 1 */}
                <div className="pb-5 current" data-kt-stepper-element="content">
                  <div className="w-100">
                    {/*begin::Heading */}
                    <div className="pb-5 pb-lg-10">
                    <h3 className="fw-bolder text-dark display-6">
                        Shipment Name
                      </h3>
                    </div>
                    {/*begin::Heading */}

                    {/*begin::Form Group */}
                    <div className="fv-row mb-12">
                      <label className="fs-6 fw-bolder text-dark form-label">
                        Identify this shipment order
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid"
                        name="appname"
                        placeholder=""
                        value={data.appBasic.appName}
                        onChange={(e) =>
                          updateData({
                            appBasic: {
                              appName: e.target.value,
                              appType: data.appBasic.appType,
                            },
                          })
                        }
                      />
                      {!data.appBasic.appName && hasError && (
                        <div className="fv-plugins-message-container">
                          <div
                            data-field="appname"
                            data-validator="notEmpty"
                            className="fv-help-block"
                          >
                            A name is required
                          </div>
                        </div>
                      )}
                    </div>
                    {/*end::Form Group */}

                  </div>
                </div>
                {/*end::Step 1 */}

                {/*begin::Step 2 */}
                <div className="pb-5" data-kt-stepper-element="content">
                  <div className="w-100">
                    {/*begin::Heading */}
                    <div className="pb-10 pb-lg-15">
                      <h3 className="fw-bolder text-dark display-6">
                        Add Orders
                      </h3>
                    </div>
                    {/*end::Heading */}

                    {/*begin::Form Group */}
                    <div className={`card`}>
      {/* begin::Header */}
      <div className={`card-header border-0 pt-5`}>
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
                href="#kt_tab_pane_2_1"
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
            id="kt_tab_pane_2_1"
            role="tabpanel"
            aria-labelledby="kt_tab_pane_2_1"
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
                  <tr>
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
                        GC-338 Blender
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Blender
                      </span>
                    </td>
                    
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        800
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        ctns
                      </span>
                    </td>

                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $1,200,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
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
                  <tr>
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
                        LDB-18 Pots
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Cookware
                      </span>
                    </td>
                    
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        130
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        ctns
                      </span>
                    </td>

                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $4,200,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bolder text-danger">-36%</span>
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
                  <tr>
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
                        GC-03 Blender
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Blender
                      </span>
                    </td>
                    
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        213
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        ctns
                      </span>
                    </td>

                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $2,200,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
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
                </tbody>
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}

          {/* begin::Tap pane */}
          <div
            id="kt_tab_pane_2_2"
            role="tabpanel"
            aria-labelledby="kt_tab_pane_2_2"
            className="tab-pane fade"
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
                  <tr>
                    <td className="p-0 py-3">
                      <div className="symbol symbol-55px mt-1 me-5">
                        <span className="symbol-label bg-light-warning align-items-end">
                          <img
                            alt="Logo"
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/047-girl-25.svg"
                            )}
                            className="mh-40px"
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-0">
                      <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                        Lebron Wayde
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Awesome Users
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $3,400,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bolder text-warning">+34%</span>
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
                  <tr>
                    <td className="p-0 py-3">
                      <div className="symbol symbol-55px mt-1">
                        <span className="symbol-label bg-light-success align-items-end">
                          <img
                            alt="Logo"
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/043-boy-18.svg"
                            )}
                            className="mh-40px"
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-0">
                      <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                        Kevin Leonard
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Awesome Userss
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $35,600,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bolder text-success">+230%</span>
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
                  <tr>
                    <td className="p-0 py-3">
                      <div className="symbol symbol-55px mt-1">
                        <span className="symbol-label bg-light-info align-items-end">
                          <img
                            alt="Logo"
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/024-boy-9.svg"
                            )}
                            className="mh-40px"
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-0">
                      <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                        Randy Trent
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Business Analyst
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $45,200,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bolder text-success">+340%</span>
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
                  <tr>
                    <td className="p-0 py-3">
                      <div className="symbol symbol-55px me-5 mt-1">
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
                        Brad Simmons
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        HTML, CSS Coding
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $1,200,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
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
                  <tr>
                    <td className="p-0 py-3">
                      <div className="symbol symbol-55px mt-1">
                        <span className="symbol-label bg-light-danger align-items-end">
                          <img
                            alt="Logo"
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/018-girl-9.svg"
                            )}
                            className="mh-40px"
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-0">
                      <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                        Jessie Clarcson
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Most Successful
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $1,200,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bolder text-danger">+52%</span>
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
                </tbody>
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}

          {/* begin::Tap pane */}
          <div
            id="kt_tab_pane_2_3"
            role="tabpanel"
            aria-labelledby="kt_tab_pane_2_3"
            className="tab-pane fade"
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
                  <tr>
                    <td className="p-0 pb-3 pt-1">
                      <div className="symbol symbol-55px mt-3 me-5">
                        <span className="symbol-label bg-light-danger align-items-end">
                          <img
                            alt="Logo"
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/018-girl-9.svg"
                            )}
                            className="mh-40px"
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-0">
                      <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                        Jessie Clarcson
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Most Successful
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $1,200,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bolder text-danger">+52%</span>
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
                  <tr>
                    <td className="p-0 pb-3 pt-1">
                      <div className="symbol symbol-55px mt-3">
                        <span className="symbol-label bg-light-warning align-items-end">
                          <img
                            alt="Logo"
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/047-girl-25.svg"
                            )}
                            className="mh-40px"
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-0">
                      <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                        Lebron Wayde
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Awesome Users
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $3,400,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bolder text-warning">+34%</span>
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
                  <tr>
                    <td className="p-0 pb-3 pt-1">
                      <div className="symbol symbol-55px mt-3">
                        <span className="symbol-label  bg-light-success align-items-end">
                          <img
                            alt="Logo"
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/043-boy-18.svg"
                            )}
                            className="mh-40px"
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-0">
                      <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                        Kevin Leonard
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Awesome Userss
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $35,600,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bolder text-success">+230%</span>
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
                  <tr>
                    <td className="p-0 pb-3 pt-1">
                      <div className="symbol symbol-55px me-5 mt-3">
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
                        Brad Simmons
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        HTML, CSS Coding
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $1,200,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
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
                  <tr>
                    <td className="p-0 pb-3 pt-1">
                      <div className="symbol symbol-55px mt-3">
                        <span className="symbol-label bg-light-info align-items-end">
                          <img
                            alt="Logo"
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/024-boy-9.svg"
                            )}
                            className="mh-40px"
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-0">
                      <a className="text-gray-800 fw-bolder text-hover-primary fs-6">
                        Randy Trent
                      </a>
                      <span className="text-muted fw-bold d-block mt-1">
                        Business Analyst
                      </span>
                    </td>
                    <td></td>
                    <td className="text-end">
                      <span className="text-gray-800 fw-bolder d-block fs-6">
                        $45,200,000
                      </span>
                      <span className="text-muted fw-bold d-block mt-1 fs-7">
                        Paid
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="fw-bolder text-success">+340%</span>
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
                    {/*end::Form Group */}
                  </div>
                </div>
                {/*end::Step 2 */}                
                {/*begin::Step 5 */}
                <div className="pb-5" data-kt-stepper-element="content">
                  <div className="w-100">
                    {/* begin::Heading */}
                    <div className="pb-10 pb-lg-15">
                      <h3 className="fw-bolder text-dark display-6">
                        Complete
                      </h3>
                      <div className="text-muted fw-bold fs-3">
                        Review your setup to kickstart your app!
                      </div>
                    </div>
                    {/* end::Heading */}

                    {/* begin::Section */}
                    <h4 className="fw-bolder mb-3">App Basics</h4>
                    <div className="text-gray-600 fw-bold lh-lg mb-8">
                      <div>{data.appBasic.appName}</div>
                      <div>{data.appBasic.appType}</div>
                    </div>
                    {/* end::Section */}

                    {/* begin::Section */}
                    <h4 className="fw-bolder mb-3">App Framework</h4>
                    <div className="text-gray-600 fw-bold lh-lg mb-8">
                      <div>{data.appFramework}</div>
                    </div>
                    {/* end::Section */}

                    {/* begin::Section */}
                    <h4 className="fw-bolder mb-3">App Database</h4>
                    <div className="text-gray-600 fw-bold lh-lg mb-8">
                      <div>{data.appDatabase.databaseName}</div>
                      <div>{data.appDatabase.databaseSolution}</div>
                    </div>
                    {/* end::Section */}

                    {/* begin::Section */}
                    <h4 className="fw-bolder mb-3">App Storage</h4>
                    <div className="text-gray-600 fw-bold lh-lg mb-8">
                      <div>{data.appStorage}</div>
                    </div>
                    {/* end::Section */}
                  </div>
                </div>
                {/*end::Step 5 */}

                {/*begin::Actions */}
                <div className="d-flex justify-content-between pt-10">
                  <div className="mr-2">
                    <button
                      type="button"
                      className="btn btn-lg btn-light-primary fw-bolder py-4 pe-8 me-3"
                      data-kt-stepper-action="previous"
                      onClick={prevStep}
                    >
                      <KTSVG
                        path="/media/icons/stockholm/Navigation/Left-2.svg"
                        className="svg-icon-3 me-1"
                      />{" "}
                      Previous
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-lg btn-primary fw-bolder py-4 ps-8 me-3"
                      data-kt-stepper-action="submit"
                      onClick={submit}
                    >
                      Submit{" "}
                      <KTSVG
                        path="/media/icons/stockholm/Navigation/Right-2.svg"
                        className="svg-icon-3 ms-2"
                      />
                    </button>

                    <button
                      type="button"
                      className="btn btn-lg btn-primary fw-bolder py-4 ps-8 me-3"
                      data-kt-stepper-action="next"
                      onClick={nextStep}
                    >
                      Next Step{" "}
                      <KTSVG
                        path="/media/icons/stockholm/Navigation/Right-2.svg"
                        className="svg-icon-3 ms-1"
                      />
                    </button>
                  </div>
                </div>
                {/*end::Actions */}
              </form>
              {/*end::Form */}
            </div>
            {/*end::Content */}
          </div>
          {/* end::Stepper */}
        </div>
      </div>
    </Modal>
  );
};

export { CreateAppModal };
