import React from "react";
import Aux from "../../hoc/AuxHoc";
import clasess from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";


const layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <main className={clasess.content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
