import React, { FunctionComponent } from "react";
import { Redirect, Route } from 'react-router-dom'
export const PrivateRoute: FunctionComponent<any> = ({
  component: Component,
  ...rest
}) => {

  const accessToken = document.cookie

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/"} />
        );
      }}
    />
  );
};