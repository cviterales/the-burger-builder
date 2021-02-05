import React, { useState } from "react";
import Aux from "../../hoc/AuxHoc";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
const BurgerBuilder = () => {
  const [ingredient, setIngredient] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchaseable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    setPurchaseable(sum > 0);
  };

  const addIngredientHandler = (type) => {
    const oldCount = ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredient,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    setTotalPrice(newPrice);
    setIngredient(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHandler = (type) => {
    const oldCount = ingredient[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...ingredient,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setTotalPrice(newPrice);
    setIngredient(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  };

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {};

  const disabledInfo = {
    ...ingredient,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        <OrderSummary
          ingredients={ingredient}
          purchaseCanceled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          price={totalPrice}
        />
      </Modal>
      <Burger ingredients={ingredient} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disabledInfo}
        price={totalPrice}
        purchasable={purchasable}
        ordered={purchaseHandler}
      />
    </Aux>
  );
};

export default BurgerBuilder;
