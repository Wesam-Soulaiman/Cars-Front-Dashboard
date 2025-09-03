export const overideComponents = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "15px",
      },
    },
  },

  MuiFormControl: {
    defaultProps: {
      margin: "dense",
      fullWidth: true,
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "15px",
        marginTop: "5px",
        marginBottom: "5px",
        paddingTop: "6px",
        paddingBottom: "6px",
        textTransform: "capitalize",
      },
    },
  },
};
