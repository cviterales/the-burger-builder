import React, { useEffect, useState } from "react";

const asyncComponent = (importComponent) => {
  return (props) => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
      importComponent().then((cmp) => {
        setComponent(cmp.default);
      });
    });
    const C = component;
    return component ? <C {...props} /> : null;
  };
};

export default asyncComponent;
