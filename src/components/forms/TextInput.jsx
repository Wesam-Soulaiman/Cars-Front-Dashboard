import {
  FormControl,
  TextField,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { forwardRef, useState } from "react";

const TextInput = forwardRef(
  (
    {
      name,
      label,
      value,
      error,
      helperText,
      onChange,
      onBlur,
      touched,
      multiline = false,
      rows = 1,
      type = "text",
      variant = "outlined",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    // Determine the actual input type
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <FormControl margin="dense" fullWidth error={error} ref={ref}>
        {variant === "outlined" ? (
          <>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
              id={name}
              name={name}
              label={label}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              multiline={multiline}
              rows={rows}
              type={inputType}
              endAdornment={
                type === "password" ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : null
              }
              {...props}
            />
          </>
        ) : (
          <TextField
            id={name}
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            multiline={multiline}
            rows={rows}
            type={inputType}
            variant={variant}
            InputProps={{
              endAdornment:
                type === "password" ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : null,
            }}
            {...props}
          />
        )}
        {variant === "outlined" && touched && error && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
