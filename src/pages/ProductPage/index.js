import { useRouteMatch } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import ProductList from "./features/components/ProductList";

function ProductPage(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} component={ProductList} exact />
    </Switch>
  );
}

export default ProductPage;
