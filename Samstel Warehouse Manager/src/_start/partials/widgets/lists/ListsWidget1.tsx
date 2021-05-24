/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import { Dropdown1 } from "../../content/dropdown/Dropdown1";

type Props = {
  className: string;
};

const ListsWidget1: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header align-items-center border-0 mt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bolder text-dark fs-3">Timeline</span>
          <span className="text-muted mt-2 fw-bold fs-6">890,344 Sales</span>
        </h3>
        <div className="card-toolbar">
          {/* begin::Dropdown */}
          <button
            type="button"
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <KTSVG
              path="/media/icons/stockholm/Layout/Layout-4-blocks-2.svg"
              className="svg-icon-1"
            />
          </button>
          <Dropdown1 />
          {/* end::Dropdown */}
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body pt-0">
        {/* <begin::Timeline */}
        <div className="timeline mt-3">
          {/* <begin::Item */}
          <div className="timeline-item align-items-start pb-1">
            {/* <begin::Label */}
            <div className="timeline-label fw-bolder text-gray-800 fs-6">
              08:42
            </div>
            {/* <end::Label */}

            {/* <begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless text-gray-200 fs-1"></i>
            </div>
            {/* <end::Badge */}

            {/* <begin::Text */}
            <div className="fw-normal fs-7 timeline-content text-gray-600 ps-3">
              Outlines keep you Indulging in poorly driving.
            </div>
            {/* <end::Text */}
          </div>
          {/* <end::Item */}

          {/* <begin::Item */}
          <div className="timeline-item align-items-start pb-1">
            {/* <begin::Label */}
            <div className="timeline-label fw-bolder text-gray-800 fs-6">
              10:00
            </div>
            {/* <end::Label */}

            {/* <begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless fs-1 text-gray-200"></i>
            </div>
            {/* <end::Badge */}

            {/* <begin::Content */}
            <div className="timeline-content d-flex">
              <span className="fw-bolder text-gray-800 ps-3 pe-3">
                AEOL meeting with
              </span>

              {/* <begin::Symbol */}
              <div className="symbol symbol-35px bg-light-primary mt-n3 me-2 align-self-center">
                <span className="symbol-label bg-light align-items-end">
                  <img
                    alt="Logo"
                    src={toAbsoluteUrl("/media/svg/avatars/004-boy-1.svg")}
                    className="mh-25px"
                  />
                </span>
              </div>
              {/* <end::Symbol */}

              {/* <begin::Symbol */}
              <div className="symbol symbol-35px bg-light-primary mt-n3 align-self-center">
                <span className="symbol-label bg-light align-items-end">
                  <img
                    alt="Logo"
                    src={toAbsoluteUrl("/media/svg/avatars/010-girl-4.svg")}
                    className="mh-25px"
                  />
                </span>
              </div>
              {/* <end::Symbol */}
            </div>
            {/* <end::Content */}
          </div>
          {/* <end::Item */}

          {/* <begin::Item */}
          <div className="timeline-item align-items-start pb-1">
            {/* <begin::Label */}
            <div className="timeline-label fw-bolder text-gray-800 fs-6">
              14:37
            </div>
            {/* <end::Label */}

            {/* <begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless fs-1 text-gray-200"></i>
            </div>
            {/* <end::Badge */}

            {/* <begin::Desc */}
            <div className="timeline-content fw-bolder text-gray-800 ps-3">
              Make deposit{" "}
              <a href="#" className="text-primary">
                USD 700
              </a>
              . to ESL
            </div>
            {/* <end::Desc */}
          </div>
          {/* <end::Item */}

          {/* <begin::Item */}
          <div className="timeline-item align-items-start pb-1">
            {/* <begin::Label */}
            <div className="timeline-label fw-bolder text-gray-800 fs-6">
              16:50
            </div>
            {/* <end::Label */}

            {/* <begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless fs-1 text-gray-200"></i>
            </div>
            {/* <end::Badge */}

            {/* <begin::Text */}
            <div className="timeline-content fw-normal fs-7 text-gray-600 ps-3">
              Poorly driving and keep structure
            </div>
            {/* <end::Text */}
          </div>
          {/* <end::Item */}

          {/* <begin::Item */}
          <div className="timeline-item align-items-start pb-1">
            {/* <begin::Label */}
            <div className="timeline-label fw-bolder text-gray-800 v">
              21:03
            </div>
            {/* <end::Label */}

            {/* <begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless fs-1 text-gray-200"></i>
            </div>
            {/* <end::Badge */}

            {/* <begin::Desc */}
            <div className="timeline-content fw-bolder text-gray-800 ps-3">
              New order placed{" "}
              <a href="#" className="text-primary">
                #XF-2356
              </a>
              .
            </div>
            {/* <end::Desc */}
          </div>
          {/* <end::Item */}

          {/* <begin::Item */}
          <div className="timeline-item align-items-start pb-1">
            {/* <begin::Label */}
            <div className="timeline-label fw-bolder text-gray-800 fs-6">
              23:41
            </div>
            {/* <end::Label */}

            {/* <begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless fs-1 text-gray-200"></i>
            </div>
            {/* <end::Badge */}

            {/* <begin::Text */}
            <div className="timeline-content fw-normal fs-7 text-gray-600 ps-3">
              Amazing keep you Indulging in poorly driving.
            </div>
            {/* <end::Text */}
          </div>
          {/* <end::Item */}

          {/* <begin::Item */}
          <div className="timeline-item align-items-start pb-1">
            {/* <begin::Label */}
            <div className="timeline-label fw-bolder text-gray-800 fs-6">
              15:27
            </div>
            {/* <end::Label */}

            {/* <begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless fs-1 text-gray-200"></i>
            </div>
            {/* <end::Badge */}

            {/* <begin::Desc */}
            <div className="timeline-content fw-bolder text-gray-800 ps-3">
              Make deposit{" "}
              <a href="#" className="text-primary">
                USD 400
              </a>
              . to ESL
            </div>
            {/* <end::Desc */}
          </div>
          {/* <end::Item */}

          {/* <begin::Item */}
          <div className="timeline-item align-items-start">
            {/* <begin::Label */}
            <div className="timeline-label fw-bolder text-gray-800 fs-6">
              23:10
            </div>
            {/* <end::Label */}

            {/* <begin::Badge */}
            <div className="timeline-badge">
              <i className="fa fa-genderless fs-1 text-gray-200"></i>
            </div>
            {/* <end::Badge */}

            {/* <begin::Text */}
            <div className="timeline-content fw-normal fs-7 text-gray-600 ps-3">
              Indulging in poorly driving and keep structure keep great
            </div>
            {/* <end::Text */}
          </div>
          {/* <end::Item */}
        </div>
        {/* <end::Timeline */}
      </div>
      {/* <end: Card Body */}
    </div>
  );
};

export { ListsWidget1 };
