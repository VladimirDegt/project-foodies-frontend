const customStyles = {
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    display: "flex",
    alignItems: "center",
    borderRadius: "30px",
    border: isFocused || isSelected ? "1px solid var(--black-20)" : "1px solid var(--black-12)",
    boxShadow: isFocused ? "0 0 0 1px var(--black-20)" : null,
    ":hover": {
      border: "1px solid var(--black-20)",
    },
    ":active": {
      border: "1px solid var(--black-20)",
    },

    padding: "0 14px",
    "@media (min-width: 375px)": {
      width: "343px",
    },
    "@media (min-width: 765px)": {
      width: "315px",
      height: "56px",
      padding: "0 18px",
    },
  }),
  menu: (styles) => ({
    ...styles,
    padding: "16px 18px",
    borderRadius: "15px",
    border: "1px solid rgba(5, 5, 5, 0.20)",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "calc(24 / 16)",
    letterSpacing: "-0.32px",
    "@media (min-width: 375px)": {
      width: "343px",
    },
    "@media (min-width: 765px)": {
      width: "315px",
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "calc(20 / 14)",
    letterSpacing: "-0.28px",
    color: "var(--black-60)",
    "@media (min-width: 1440px)": {
      fontSize: "16px",
    },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "var(--black)",
    paddigRight: "14px",
    svg: {
      width: "18px",
      height: "18px",
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: "10px 0px",
  }),
};

export default customStyles;
