import React, { FC, PropsWithChildren } from "react";

interface Props {}

export const AccountLayout: FC<PropsWithChildren<Props>> = (props) => {
  const { children } = props;
  return <>{children}</>;
};
