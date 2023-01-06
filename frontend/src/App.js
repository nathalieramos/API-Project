import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import CreateSongForm from "./components/Songs/index";
import { getSongsThunk } from "./store/songs";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState()

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    if (user) setIsLoggedIn(true)
    if (user === null) setIsLoggedIn(false)
  }, [user])

  return (
    <>
      <Navigation isLoaded={isLoaded} isLoggedIn={isLoggedIn}/>
      {isLoaded && (
         <Switch>


          <Route path="/signup">
            <SignupFormPage />
          </Route>


          <Route path="/songs/new">
            <CreateSongForm />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
