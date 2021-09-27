import React from "react";
import { Input } from "reactstrap";
import InputMask from "react-input-mask";

export const MaskInputCPF = ({ value, onChange }) => {
  return (
    <Input
      as={InputMask}
      mask="999.999.999-99"
      value={value}
      onChange={onChange}
    />
  );
};
