/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";

import { cn } from "../mylib/utils";

export interface OptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const Option = React.forwardRef<HTMLOptionElement, OptionProps>(
  ({ className, ...props }, ref) => {
    return <option className={cn("", className)} ref={ref} {...props}></option>;
  }
);
Option.displayName = "Option";

export { Option };
