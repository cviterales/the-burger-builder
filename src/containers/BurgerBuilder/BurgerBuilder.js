import React, { useState } from "react";
import Aux from "../../hoc/AuxHoc";
import Burger from "../../components/Burger/Burger";

const BurgerBuilder = () => {
  const [ingredient, setIngredient] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });

  return (
    <Aux>
      <Burger ingredients={ingredient}/>
      <div>Burger Controls</div>
    </Aux>
  );
};

export default BurgerBuilder;
