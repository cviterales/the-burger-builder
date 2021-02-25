import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
import * as orderActions from "../../store/actions/index";

const Checkout = (props) => {
  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const purchased = useSelector((state) => state.orders.purchased);
  
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(orderActions.purchaseInit());
    }
  }, [dispatch]);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };
  const checkoutContinuedHanlder = () => {
    props.history.replace("/checkout/contact-data");
  };
  let summary = <Redirect to="/" />;

  if (ingredients) {
    const purchaseRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHanlder}
        />
        <Route
          path={props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={ingredients}
              price={totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
  return summary;
};

export default Checkout;
