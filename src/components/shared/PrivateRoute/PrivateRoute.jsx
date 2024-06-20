import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectToken } from "src/store/selectors/authSelectors";

export const PrivateRoute = ({ component: Component }) => {
  const token = useSelector(selectToken);

  return token ? <Component /> : <Navigate to="/" />;
};
