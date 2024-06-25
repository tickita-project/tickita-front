import { ComponentPropsWithoutRef, forwardRef } from "react";

import classNames from "classnames/bind";

import styles from "./Input.module.scss";

const cn = classNames.bind(styles);

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  errorMessage?: string;
  isRequired?: boolean;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, errorMessage, isRequired, ...restProps }: InputProps,
  ref,
) {
  return (
    <div className={cn("container")}>
      <label htmlFor={id}>
        {label}
        {isRequired && <span className={cn("required-field")}>*</span>}
        {isRequired === false && <span className={cn("selective-field")}>(선택)</span>}
      </label>
      <input
        ref={ref}
        id={id}
        {...restProps}
        className={cn(restProps.className, { "error-style": errorMessage })}
      />
      {errorMessage && <span className={cn("error-message")}>{errorMessage}</span>}
    </div>
  );
});
