import React from "react";

export const AddressComponent: React.FunctionComponent<{address: string}> = ({address}) => {
  const parseAddress = (add: string) => `${add.slice(0, 5)}...${add.slice(-5)}`;

  return <>{parseAddress(address)}</>;
};

export default AddressComponent;
