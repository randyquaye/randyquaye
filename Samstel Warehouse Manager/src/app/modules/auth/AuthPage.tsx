import React, { useEffect } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Registration } from "./components/Registration";
import { ForgotPassword } from "./components/ForgotPassword";
import { Login } from "./components/Login";
import { toAbsoluteUrl } from "../../../_start/helpers";

export function AuthPage() {
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  const css = {
    backgroundImage: `url(${toAbsoluteUrl(
      "/media/svg/illustrations/login-1.svg"
    )})`,
    height: '20vh',
  };

  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex flex-column flex-lg-row flex-column-fluid"
        id="kt_login"
      >
        {/* Aside */}
        <div className="d-flex flex-column flex-lg-row-auto bg-primary w-lg-600px pt-15 pt-lg-0" style={css}>
          {/* Top */}
          <div
            className="d-flex flex-row-fluid bgi-size-contain bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
            
          ></div>
        </div>

        {/* Content */}
        <div style={{height: '80vh',}} className="login-content flex-lg-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden py-20 px-10 p-lg-7 mx-auto mw-450px w-100">
          <div className="d-flex flex-column-fluid flex-center py-10">
            <Switch>
              <Route path="/auth/login" component={Login} />
              <Route path="/auth/registration" component={Registration} />
              <Route path="/auth/forgot-password" component={ForgotPassword} />
              <Redirect from="/auth" exact={true} to="/auth/login" />
              <Redirect to="/auth/login" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
