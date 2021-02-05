import React, { useState } from "react";
import Aux from "../../hoc/AuxHoc";
import clasess from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(true);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => {
      return !prevState
    });
  };

  return (
    <Aux>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <main className={clasess.content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
