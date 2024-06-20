import styles from './HeaderNav.module.css'
import { StyledLink } from './StyledLink';

const HeaderNav = ({isHome}) => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.wrap_navigation}>
        <li>
          <StyledLink to="/" home={isHome.toString()}>
            Home
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/recipe/add" home={isHome.toString()}>
            Add recipe
          </StyledLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
