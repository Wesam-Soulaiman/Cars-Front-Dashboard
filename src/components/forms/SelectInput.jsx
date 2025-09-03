import {
  FormControl,
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { forwardRef } from "react";

const SelectInput = forwardRef(
  (
    {
      name,
      options,
      value,
      label,
      placeholder,
      error,
      helperText,
      loading,
      onChange,
      onBlur,
      getOptionLabel = (option) => option.name,
      isOptionEqualToValue = (option, value) => option.id === value.id,
      renderOption,
      onInputChange,
      required,
    },
    ref
  ) => {
    return (
      <FormControl margin="dense" fullWidth error={error} ref={ref}>
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          value={value}
          loading={loading}
          onChange={onChange}
          onBlur={onBlur}
          isOptionEqualToValue={isOptionEqualToValue}
          renderOption={
            renderOption ||
            ((props, option) => (
              <Box component="li" {...props} key={option.id}>
                {getOptionLabel(option)}
              </Box>
            ))
          }
          onInputChange={onInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              label={label}
              placeholder={placeholder}
              error={error}
              helperText={helperText}
              required={required}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </FormControl>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
