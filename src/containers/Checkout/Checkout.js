import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
const Checkout = (props) => {
  const ingredients = useSelector((state) => state.ingredients);
  const totalPrice = useSelector((state) => state.totalPrice);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };
  const checkoutContinuedHanlder = () => {
    props.history.replace("/checkout/contact-data");
  };
  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHanlder}
      />
      <Route
        path={props.match.path + "/contact-data"}
        render={(props) => (
          <ContactData ingredients={ingredients} price={totalPrice} {...props}/>
        )}
      />
    </div>
  );
};

export default Checkout;
