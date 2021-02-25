import React, { useEffect, useState } from "react";
import Aux from "../../hoc/AuxHoc/AuxHoc";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  /* const [error, setError] = useState(false); */

  const dispatch = useDispatch();
  const error = useSelector((state) => state.burgerBuilder.error);
  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  //const purchased = useSelector((state) => state.orders.purchased);

  useEffect(() => {
    dispatch(actions.initIngredients())
  }, [dispatch]);

  const onIngredientAdded = (ingName) => {
    dispatch(actions.addIngredients(ingName));
  };

  const onIngredientRemoved = (ingName) => {
    dispatch(actions.removeIngredients(ingName));
  };

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    dispatch(actions.purchaseInit())
    props.history.push({
      pathname: "/checkout",
    });
  };

  const disabledInfo = {
    ...ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={updatePurchaseState(ingredients)}
          ordered={purchaseHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={totalPrice}
      />
    );
  }
  if (loading) {
    orderSummary = <Spinner />;
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
