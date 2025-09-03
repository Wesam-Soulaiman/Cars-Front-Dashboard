import { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, FormControl } from "@mui/material";
import { ChromePicker } from "react-color";
import { MdColorLens } from "react-icons/md";

const ColorPickerField = ({ label, value, onChange, onBlur }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [internalColor, setInternalColor] = useState(value || "#ffffff");
  const pickerRef = useRef(null);
  const textFieldRef = useRef(null);

  // Handle clicks outside to close the picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        textFieldRef.current &&
        !textFieldRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorChange = (color) => {
    setInternalColor(color.hex);
    onChange(color.hex);
  };

  const handleTextFieldClick = () => {
    setShowColorPicker(true);
  };

  return (
    <FormControl fullWidth margin="dense" ref={textFieldRef}>
      <TextField
        label={label}
        value={value}
        onClick={handleTextFieldClick}
        onBlur={onBlur}
        inputProps={{
          readOnly: true,
          style: { cursor: "pointer" },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            paddingLeft: "14px",
            cursor: "pointer",
          },
        }}
        InputProps={{
          startAdornment: (
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: value || "#ffffff",
                border: "1px solid #ccc",
                mr: 1,
              }}
            />
          ),
          endAdornment: (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
              }}
              sx={{ mr: -1.5 }}
            >
              <MdColorLens />
            </IconButton>
          ),
        }}
      />
      {showColorPicker && (
        <Box
          ref={pickerRef}
          position="absolute"
          zIndex={1}
          mt={1}
          sx={{
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
          <ChromePicker
            color={internalColor}
            onChangeComplete={handleColorChange}
          />
        </Box>
      )}
    </FormControl>
  );
};

export default ColorPickerField;
