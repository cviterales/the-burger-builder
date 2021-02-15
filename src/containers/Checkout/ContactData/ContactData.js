import React, { useState } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

import axios from "../../../axios-order";

const ContactData = (props) => {
  const state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };
  const [loading, setLoading] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: "Cristian",
        address: {
          street: "TestStreet 1",
          zipCode: "7601",
          country: "Argentina",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        props.history.push('/')
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  let form = (
    <form>
      <input
        className={classes.Input}
        type="text"
        name="name"
        placeholder="Your name"
      />
      <input
        className={classes.Input}
        type="text"
        name="email"
        placeholder="Your email"
      />
      <input
        className={classes.Input}
        type="text"
        name="street"
        placeholder="Street"
      />
      <input
        className={classes.Input}
        type="text"
        name="postal"
        placeholder="Postal Code"
      />
      <Button btnType="Success" clicked={orderHandler}>
        ORDER
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default ContactData;
