import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { FallbackView } from "../../_start/partials";
import { StartDashboardWrapper } from "../pages/start-dashboard/StartDashboardWrapper";
import { CreateShipmentWrapper } from "../pages/create-shipment/CreateShipmentWrapper";
import { ShipmentDashboardPage } from "../pages/shipment-dashboard/ShipmentDashPage";
import { RegistrationPage } from "../pages/registration/RegistrationPage";
import { MenuTestPage } from "../pages/MenuTestPage";

export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(
    () => import("../pages/layout-builder/BuilderPageWrapper")
  );
  const ProfilePageWrapper = lazy(
    () => import("../modules/profile/ProfilePageWrapper")
  );
  const ChagePage = lazy(() => import("../modules/apps/chat/ChatPageWrapper"));
  const ShopPageWrapper = lazy(
    () => import("../modules/apps/shop/ShopPageWrapper")
  );
  const GeneralPageWrapper = lazy(
    () => import("../modules/general/GeneralPageWrapper")
  );
  const DocsPageWrapper = lazy(() => import("../modules/docs/DocsPageWrapper"));

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path="/dashboard" component={StartDashboardWrapper} />
        <Route exact path="/shipment" component={CreateShipmentWrapper} />
        <Route exact path="/shipment/:id" component={ShipmentDashboardPage} />
        <Route path="/registration" component={RegistrationPage} />
        <Redirect from="/auth" to="/dashboard" />
        <Redirect exact from="/" to="/dashboard" />
        <Redirect to="error/404" />
      </Switch>
    </Suspense>
  );
}
