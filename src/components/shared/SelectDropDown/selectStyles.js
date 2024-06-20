export const customStyles = {
  control: (provided) => ({
    ...provided,
    background: "transparent",
    border: "none",
    display: "flex",
    flexWrap: "nowrap",
    borderRadius: "30px",
    boxShadow: "inset 0 0 0 1px var(--black-12)",
  }),
  menu: (provided) => ({
    ...provided,
    background: "#ffffff",
    backgroundColor: "#ffffff",
    borderRadius: "15px",
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "14px",
    lineHeight: "1.4",
    fontWeight: "500",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px",
    lineHeight: " 1.4",
    fontWeight: "500",
    color: "rgba(05,05,05,0.6)",
    "@media (min-width: 768px)": {
      fontSize: "16px",
      lineHeight: "1.5",
      fontWeight: "600",
      color: "rgba(0, 0, 0, 0.6)",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--black)",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
};
