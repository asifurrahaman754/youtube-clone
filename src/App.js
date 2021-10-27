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
import "./_base.scss";
import { setuser } from "./redux/youtubeSlice";
import { getUserInitialLoad } from "./firebase";
import WatchScreen from "./pages/Watch/WatchScreen";
import SidebarMobile from "./components/Sidebar/SidebarMobile";
import Search from "./components/Search";
import Channel from "./pages/Channel";

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
  }, [dispatch]);

  return (
    <Router>
      {/* if it is WatchScreen page then show the humberger menu */}
      <Switch>
        <Route exact path="/">
          <Header />
        </Route>
        <Route exact path="/video/:id">
          <Header showinDesktop={true} />
        </Route>
        <Route exact path="/search/:query">
          <Header />
        </Route>
        <Route exact path="/channel/:channelid">
          <Header />
        </Route>
      </Switch>

      <div className="app_container">
        <SidebarMobile />

        <Switch>
          <Route exact path="/">
            <Sidebar />
            <HomeScreen />
          </Route>
          <Route exact path="/video/:id">
            <WatchScreen />
          </Route>
          <Route exact path="/search/:query">
            <Sidebar />
            <Search />
          </Route>
          <Route exact path="/channel/:channelid">
            <Sidebar />
            <Channel />
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
