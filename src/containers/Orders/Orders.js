import React, { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchOrders());
  }, [dispatch]);

  let showOrders = <Spinner />;
  if (!loading) {
    showOrders = orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
  }
  return <div>{showOrders}</div>;
};

export default withErrorHandler(Orders, axios);
