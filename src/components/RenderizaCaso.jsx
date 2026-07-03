import React from "react";

export const RenderizaCaso = ({ caso, children }) => {
  if (!caso) return <React.Fragment />;

  return React.isValidElement(children) ? React.cloneElement(children) : <>children</>;
};
