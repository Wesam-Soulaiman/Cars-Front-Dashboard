import { FormControl, TextField } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";

const NumberInput = forwardRef(
  ({ name, label, value, error, helperText, onChange, onBlur }, ref) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
      const timerId = setTimeout(() => {
        if (inputValue !== value) {
          onChange({ target: { value: inputValue } });
        }
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }, [inputValue, value, onChange]);

    const handleChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleWheel = (e) => {
      e.target.blur();
    };

    return (
      <FormControl margin="dense" fullWidth error={error} ref={ref}>
        <TextField
          type="number"
          name={name}
          label={label}
          value={inputValue}
          onChange={handleChange}
          error={error}
          helperText={helperText}
          onBlur={onBlur}
          onWheel={handleWheel}
          slotProps={{
            input: {
              onWheel: handleWheel,
            },
          }}
        />
      </FormControl>
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
