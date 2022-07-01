import { Route, Switch } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <Switch>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;

          return (
            <Route key={index} path={route.path} exact={route.exact}>
              <Layout>
                <Page />
              </Layout>
            </Route>
          );
        })}
      </Switch>
    </div>
  );
}

export default App;
