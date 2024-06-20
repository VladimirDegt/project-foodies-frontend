import Select from "react-select";
import { useState } from "react";
import { categoriesOpt, ingridientsOpt, areaOpt } from "./options";
import { customStyles } from "./selectStyles";
import styles from "./SelectDropDown.module.css";

const SelectDropDown = ({ placeholder, variant = "categories" }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const getOptions = () => {
    switch (variant) {
      case "categories":
        return categoriesOpt;
      case "ingredients":
        return ingridientsOpt;
      case "area":
        return areaOpt;
      default:
        return categoriesOpt;
    }
  };
  return (
    <div className={styles.container}>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={getOptions()}
        placeholder={placeholder}
        styles={customStyles}
      />
    </div>
  );
};

export default SelectDropDown;
