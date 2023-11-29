import React, { useState } from "react";
import {
  TextField,
  TextFieldProps,
  InputLabel,
  Box,
  FormLabel,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RadioGroup from "@mui/material/RadioGroup";
import { Controller } from "react-hook-form";
import { CustomIconButton } from "../Buttons";
import type { IFieldInputProps } from "./input";
import { RegexPatterns, inputsType } from "../../utils";
import "./index.css";
import { RestartAlt } from "@mui/icons-material";

type TTextFieldProps = TextFieldProps & {};
const CustomTextField = (props: TTextFieldProps) => {
  return (
    <Box mb={"1rem"}>
      <InputLabel
        sx={{
          textTransform: "uppercase",
          fontSize: "0.875rem",
          mb: "0.2rem",
        }}
      >
        {props.label}
      </InputLabel>
      <TextField
        {...props}
        variant="outlined"
        placeholder={`${props.label}`}
        InputLabelProps={{ shrink: false }}
        label=""
        size="small"
        sx={{
          ":focus": {
            color: "unset",
          },
          "& ::placeholder": {
            fontSize: "14px !important",
          },
        }}
      />
    </Box>
  );
};

const FieldInput = (props: IFieldInputProps) => {
  const {
    type,
    label,
    watch,
    isError,
    control,
    register,
    fullWidth,
    helperText,
    isRequired,
    registerWith,
    placeholder,
    readOnly,
    disabled,
    ...rest
  } = props;
  const passwordText = watch && watch(inputsType.PASSWORD);

  const [visible, setVisible] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(inputsType.PASSWORD);

  const handleToggle = () => {
    setVisible((prev) => !prev);
    setInputType((prev) =>
      prev === inputsType.PASSWORD ? inputsType.TEXT : inputsType.PASSWORD
    );
  };

  // eslint-disable-next-line consistent-return
  const doValidate = () => {
    if (!isRequired) return;
    if (type === inputsType.EMAIL) {
      return (value: string) =>
        RegexPatterns.Email.test(value) || "* Please enter a valid email";
    }
    if (type === inputsType.PASSWORD) {
      return (value: string) =>
        RegexPatterns.Password.test(value) ||
        "* Password must have at least 8 letters";
    }
    if (type === inputsType.DATE) {
      return (value: string) =>
        RegexPatterns.DateFormat.test(value) || "* Not a valid date";
    }
    if (type === inputsType.NUMBER) {
      return (value: string) => value.length <= 10 || "* Not a valid input";
    }
    if (type === inputsType.TEXT && registerWith.endsWith("contactNUMBER")) {
      return (value: string) =>
        RegexPatterns.contactNUMBER.test(value) ||
        "* Not a valid contact number";
    }
    if (type === inputsType.TEXT && registerWith.endsWith("PINCODENUMBER")) {
      return (value: string) =>
        RegexPatterns.PINCODE.test(value) || "* Not a valid PIN Code number";
    }
    if (type === inputsType.TEXT && registerWith.endsWith("YEAR")) {
      return (value: string) =>
        RegexPatterns.PASSING_YEAR.test(value) || "* Not a valid year";
    }
    if (type === inputsType.TEXT && registerWith.startsWith("PAN")) {
      return (value: string) =>
        RegexPatterns.PAN_NUMBER.test(value) || "* Not a valid PAN Number";
    }
    if (type === inputsType.TEXT && registerWith.startsWith("AADHAAR")) {
      return (value: string) =>
        RegexPatterns.AADHAAR_NUMBER.test(value) ||
        "* Not a valid Aadhaar Number";
    }
  };

  return (
    <Controller
      name={registerWith}
      control={control}
      render={function ({ field: { value } }) {
        let updatedValue: any;
        if (
          ["text", "textarea"].includes(type) &&
          registerWith.endsWith("NUMBER")
        ) {
          console.log("Hello");
          if (typeof value === "string") {
            updatedValue = value?.replace(/\D/g, "");
          } else if (typeof value === "number") {
            updatedValue = value;
          }
        } else {
          updatedValue = typeof value === 'string' ? value?.trim()?.length ? value : value?.trim() : value;
        }
        return (
          <Box mb={"1rem"}>
            <InputLabel
              sx={{
                textTransform: "uppercase",
                fontSize: "0.875rem",
                mb: "0.2rem",
              }}
            >
              {props.label}
            </InputLabel>
            <TextField
              fullWidth={fullWidth || false}
              type={type === inputsType.PASSWORD ? inputType : type}
              multiline={!!(type === inputsType.TEXTAREA)}
              rows={type === inputsType.TEXTAREA ? 3 : 0}
              // maxRows={type === inputsType.TEXTAREA ? Infinity : undefined}
              placeholder={placeholder || ""}
              size="small"
              label=""
              value={updatedValue}
              sx={{
                ":focus": {
                  color: "unset",
                },
                "& ::placeholder": {
                  fontSize: "14px !important",
                },
              }}
              error={isError || false}
              variant="outlined"
              helperText={helperText}
              {...register(registerWith, {
                required: isRequired
                  ? `* ${label.replace(/\*/g, "")} is required`
                  : false,

                validate: doValidate(),
              })}
              FormHelperTextProps={{
                sx: {
                  ml: 0,
                },
              }}
              InputProps={{
                readOnly,
                disabled,
                endAdornment: passwordText?.length ? (
                  <CustomIconButton onClick={handleToggle}>
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </CustomIconButton>
                ) : null,
              }}
            />
          </Box>
        );
      }}
    />
  );
};

const RadioInputGroup = (
  props: IFieldInputProps & {
    isRow: boolean;
    options: { label: string; value: string | number; id: string | number }[];
    defaultValue?: string;
  }
) => {
  const {
    isRow,
    label,
    watch,
    isError,
    control,
    register,
    fullWidth,
    helperText,
    isRequired,
    registerWith,
    placeholder,
    options,
    defaultValue,
  } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        sx={{ textTransform: "uppercase", fontSize: "0.875rem", mb: "0.2rem" }}
      >
        {label}
      </FormLabel>
      <Controller
        name={registerWith}
        control={control}
        rules={{
          required: {
            message: "This is required field",
            value: Boolean(isRequired),
          },
        }}
        render={({ field }) => {
          return (
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={isRow ? "row" : "column"}
              gap={"1rem"}
            >
              {options.map((item) => {
                return (
                  <div className={"mui-radio"}>
                    <label htmlFor={String(item.id)}>
                      <input
                        id={String(item.id)}
                        type="radio"
                        {...field}
                        value={item.value}
                        {...(defaultValue
                          ? { checked: defaultValue === item.value }
                          : {})}
                        {...(!!isError && { style: { borderColor: "red" } })}
                      />
                      {item.label}
                    </label>
                  </div>
                );
              })}
            </Box>
          );
        }}
      />
      {!!isError && (
        <FormHelperText sx={{ ml: 0 }} error={!!isError}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export { CustomTextField, FieldInput, RadioInputGroup };
