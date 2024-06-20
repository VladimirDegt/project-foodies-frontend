import styles from "./TabMenu.module.css";

const TabMenu = ({ menuItems, activeTab, setActiveTab }) => {
  return (
    <div className={styles.menuContainer}>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.menuItem} ${item.id === activeTab ? styles.active : ""}`}
          onClick={() => setActiveTab(item.id)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default TabMenu;
