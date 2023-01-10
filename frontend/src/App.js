import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import CreateSongForm from "./components/Songs/CreateSong/CreateSong";
import GetSongsDetails from "./components/Songs/GetSongDetails/GetSongDetails";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>


          <Route path="/signup">
            <SignupFormPage />
          </Route>


          <Route path="/songs/new">
            <CreateSongForm />
          </Route>

        <Route path="/songs/:id">
            <GetSongsDetails />
        </Route>


        </Switch>
  )
}
    </>
  );
}

export default App;
