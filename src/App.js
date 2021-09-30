import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./pages/Home/HomeScreen";
import "./_app.scss";
import { setuser } from "./redux/youtubeSlice";
import { getUserInitialLoad } from "./firebase";

function App() {
  const dispatch = useDispatch();

  //get the loged in user
  useEffect(() => {
    getUserInitialLoad(user => {
      if (user) {
        dispatch(
          setuser({
            id: user.accessToken,
            name: user.displayName,
            photo: user.photoURL,
          })
        );
      } else {
        dispatch(setuser({}));
      }
    });
  }, []);

  return (
    <Router>
      <Header />
      <div className="app_container">
        <Sidebar />

        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route exact path="/search">
            <h1>search results</h1>
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
