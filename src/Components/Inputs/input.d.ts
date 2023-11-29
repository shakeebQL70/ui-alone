export interface IFieldInputProps {
  type:
    | "text"
    | "email"
    | "password"
    | "date"
    | "textarea"
    | "time"
    | "number"
    | "month";
  control: any;
  label: string;
  fullWidth: boolean;
  isError?: boolean;
  isRequired?: boolean;
  registerWith: string;
  placeholder?: string;
  helperText?:
    | string
    | undefined
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>;
  watch?: UseFormWatch<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  readOnly?: boolean;
  disabled?: boolean;
}
