import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { FallbackView } from "../../_start/partials";
import { StartDashboardWrapper } from "../pages/start-dashboard/StartDashboardWrapper";
import { CreateShipmentWrapper } from "../pages/create-shipment/CreateShipmentWrapper";
import { ShipmentDashboardPage } from "../pages/shipment-details/ShipmentDashPage";
import { RegistrationPage } from "../pages/registration/RegistrationPage";
import { MenuTestPage } from "../pages/MenuTestPage";
// import ProductDashWrapper from "../pages/product-details/ProductDashWrapper";

export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(
    () => import("../pages/layout-builder/BuilderPageWrapper")
  );
  const ProductDashWrapper = lazy(
    () => import("../pages/product-details/ProductDashWrapper")
  );
  const ShipmentDashWrapper = lazy(
    () => import("../pages/shipment-details/ShipmentDashWrapper")
  );

  const BillsPageWrapper = lazy(
    () => import("../pages/bills/BillsPageWrapper")
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
        <Route exact path="/shipment/:id" component={ShipmentDashWrapper} />
        <Route exact path="/product/:id" component={ProductDashWrapper} />
        <Route exact path="/bills" component={BillsPageWrapper} />
        <Route path="/registration" component={RegistrationPage} />
        <Redirect from="/auth" to="/dashboard" />
        <Redirect exact from="/" to="/dashboard" />
        <Redirect to="error/404" />
      </Switch>
    </Suspense>
  );
}
