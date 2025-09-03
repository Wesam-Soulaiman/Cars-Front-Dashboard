import { DatePicker } from "@mui/x-date-pickers";
import { FormControl } from "@mui/material";

const DatePickerInput = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  required,
  onBlur,
  touched,
  ...props
}) => {
  return (
    <FormControl fullWidth error={error}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        onClose={onBlur}
        slotProps={{
          textField: {
            fullWidth: true,
            name,
            error,
            helperText,
            required,
            onBlur,
          },
        }}
        {...props}
      />
    </FormControl>
  );
};

DatePickerInput.displayName = "DatePickerInput";

export default DatePickerInput;
