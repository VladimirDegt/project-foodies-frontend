import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(NavLink)`
  color: ${({ home }) => (home === "true" ? "var(--white)" : "var(--black)")};
  display: inline-block;
  padding: 14px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.24px;
  text-transform: uppercase;
  transition: background-color var(--transition), color var(--transition);
  border-radius: 30px;

  &.active {
    border: ${({ home }) =>
      home === "true" ? "1px solid var(--white)" : "1px solid rgba(5, 5, 5, 0.2)"};
  }

  &:hover,
  &:focus {
    background-color: ${({ home }) => (home === "true" ? "var(--white)" : "var(--black)")};
    color: ${({ home }) => (home === "true" ? "var(--black)" : "var(--white)")};
  }
`;
