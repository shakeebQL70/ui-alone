import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import { FormHelperText, Typography } from "@mui/material";

interface IBasicSelect {
  inputLabel: string;
  placeholder: string;
  value: string;
  handleSetValue: (...params: any[]) => void;
  items: { id: string; label: string }[];
}
export function BasicSelect(props: IBasicSelect) {
  const { inputLabel, handleSetValue, value, items, placeholder } = props;

  return (
    <Box sx={{ mb: "1rem" }}>
      <FormControl fullWidth size="small" variant="outlined">
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "0.875rem",
            mb: "0.2rem",
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {inputLabel}
        </Typography>
        <Select
          labelId={`select-label-${inputLabel}`}
          id="simple-select"
          value={value}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          onChange={handleSetValue}
          renderValue={(selected: string) => {
            if (selected?.length === 0) {
              return (
                <Typography sx={{ color: "rgba(0, 0, 0, 0.4)" }}>
                  {placeholder}
                </Typography>
              );
            }
            return selected;
          }}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

interface IBasicSelectSearch {
  selectLabel: string;
  options: { label: string; id: string }[];
  value: any;
}
export function BasicSelectSearch(props: IBasicSelectSearch) {
  const { selectLabel, options, value } = props;
  return (
    <Box mb={"1rem"}>
      <InputLabel
        sx={{
          textTransform: "uppercase",
          fontSize: "0.875rem",
          mb: "0.2rem",
        }}
      >
        {selectLabel}
      </InputLabel>
      <Autocomplete
        disablePortal
        id={`combo-box-${selectLabel}`}
        defaultValue={options[0]}
        options={options}
        value={value}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label={""}
            InputLabelProps={{ shrink: false }}
            placeholder={selectLabel}
          />
        )}
      />
    </Box>
  );
}

export function RHFAutoComplete({
  control,
  options,
  selectLabel,
  registerWith,
  errorMessage,
  isRequired,
  placeholder,
  isMultiple = false,
}: any) {
  return (
    <Controller
      name={registerWith}
      control={control}
      rules={{
        required: {
          message: "This is a required field",
          value: isRequired,
        },
      }}
      render={({ field }) => {
        const { onChange, value, ref, ...rest } = field;

        return (
          <Box mb={"1rem"}>
            <InputLabel
              sx={{
                textTransform: "uppercase",
                fontSize: "0.875rem",
                mb: "0.2rem",
              }}
            >
              {selectLabel}
            </InputLabel>
            <Autocomplete
              {...rest}
              disablePortal
              multiple={isMultiple}
              id={`combo-box-${selectLabel}`}
              sx={{ mb: "0.5rem" }}
              ListboxProps={{ style: { maxHeight: 200 } }}
              options={options}
              size="small"
              onChange={(event: any, newValue) => {
                // onChange(newValue ? newValue.id : null); // ! don't remove commented code
                onChange(newValue);
              }}
              value={
                value
                // ? options.find((option: any) => {
                //     return value === option.id;
                //   }) ?? null
                // : null
                // ! don't remove above commented code
              }
              getOptionLabel={(option) => {
                return option?.label ?? option;
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option.id === value.id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={""}
                  error={!!errorMessage}
                  InputLabelProps={{ shrink: false }}
                  placeholder={placeholder}
                  inputRef={ref}
                  helperText={errorMessage}
                  FormHelperTextProps={{
                    sx: {
                      ml: 0,
                      color: "#d32f2f",
                    },
                  }}
                />
              )}
            />
          </Box>
        );
      }}
    />
  );
}

export function RHFSelect({
  control,
  options,
  selectLabel,
  registerWith,
  errorMessage,
  isRequired,
  placeholder,
}: any) {
  return (
    <Controller
      name={registerWith}
      control={control}
      rules={{
        required: {
          message: "This is a required field",
          value: isRequired,
        },
      }}
      render={({ field }) => {
        const { onChange, value, ref, ...rest } = field;
        return (
          <Box mb={"1rem"}>
            <InputLabel
              sx={{
                textTransform: "uppercase",
                fontSize: "0.875rem",
                mb: "0.2rem",
              }}
            >
              {selectLabel}
            </InputLabel>
            <Select
              {...rest}
              fullWidth
              size="small"
              labelId={`select-label-${selectLabel}`}
              id="simple-select"
              value={value}
              error={!!errorMessage}
              displayEmpty
              inputRef={ref}
              placeholder={placeholder}
              inputProps={{ "aria-label": "Without label" }}
              onChange={onChange}
              renderValue={(selected: string) => {
                if (selected?.length === 0) {
                  return (
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.4)",
                        maxWidth: "15ch",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {placeholder}
                    </Typography>
                  );
                }
                return options[+selected - 1].label;
              }}
            >
              {!options.length ? (
                <MenuItem key={1} value={""} disabled>
                  No Option
                </MenuItem>
              ) : (
                options.map((item: any) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  );
                })
              )}
            </Select>
            <FormHelperText
              sx={{
                ml: 0,
                color: "#d32f2f",
              }}
            >
              {errorMessage}
            </FormHelperText>
          </Box>
        );
      }}
    />
  );
}
