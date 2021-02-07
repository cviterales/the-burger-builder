import React, { useState } from "react";
import Aux from "../AuxHoc/AuxHoc";
import clasess from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
