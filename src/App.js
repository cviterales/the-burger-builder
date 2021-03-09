import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Spinner from "./components/UI/Spinner/Spinner";
/* import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout")
});
const asyncOrders= asyncComponent(() => {
  return import("./containers/Orders/Orders")
});
 */
const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div style={{ position: "absolute", left: "50%", top: "50%" }}>
            <Spinner />
          </div>
        }
      >
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </Suspense>
    </div>
  );
}

export default App;
