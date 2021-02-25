import React, { useEffect, useState } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../AuxHoc/AuxHoc";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState();

    useEffect(() => {
      let reqInterceptor = axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
      let resInterceptor = axios.interceptors.response.use(res => res, (err) => {
        setError(err);
      });
      return (() => {
        axios.interceptors.request.eject(reqInterceptor)
        axios.interceptors.response.eject(resInterceptor)
      })
    }, []);

    const errorConfirmedHandler = () => {
      setError(null)
    }

    return (
      <Aux>
        <Modal 
          show={error} 
          modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
