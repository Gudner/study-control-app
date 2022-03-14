import { ErrorMessage, useField } from "formik";
import { forwardRef } from "react";
import style from "./InputText.module.scss";
import classNames from "classnames";

export const InputText = forwardRef((props, ref) => {
  const [field, meta] = useField(props);

  return (
    <div className={style.input__wrap}>
      <input
        id={props.id}
        className={classNames(
          style.input,
          meta.error && meta.touched && style.invalid,
        )}
        {...field}
        {...props}
      />

      <ErrorMessage
        className={style.error__message}
        component="p"
        name={field.name}
      />
    </div>
  );
});