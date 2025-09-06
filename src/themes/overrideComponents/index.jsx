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
      contained: {
        backgroundImage: "linear-gradient(to left , #ef4444 , #f87171)",
      },
      root: {
        borderRadius: "0px",
        marginTop: "5px",
        marginBottom: "5px",
        padding: "12px 24px",
        textTransform: "capitalize",
        position: "realtive",
        "&:hover::after": {
          top: 0,
          right: 0,
          transform: "rotate(0deg)",
        },
        "&::after": {
          content: "''",
          position: "absolute",
          top: "-2px",
          right: "-1px",
          width: "100%",
          height: "100%",
          transition: "all 0.3s",
          // zIndex: -1,
          transform: "rotate(-1deg)",
          backgroundColor: "transparent",
          border: "1px solid white",
        },
      },
    },
  },
};
