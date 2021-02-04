import React from "react";
import Aux from "../../hoc/AuxHoc";
import clasess from './Layout.css'

const layout = (props) => {
  return (
    <Aux>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={clasess.content}>{props.children}</main>
    </Aux>
  );
};

export default layout;