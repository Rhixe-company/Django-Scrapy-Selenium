/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";

import { cn } from "@/components/mylib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-primary-foreground dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )}
        ref={ref}
        {...props}
      ></select>
    );
  }
);
Select.displayName = "Select";

export { Select };
