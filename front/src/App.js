import React from "react";
import { Grommet, grommet, Box, Button } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./features/session/Login";
import Posts from "./features/posts/Posts";

import fire from "./fire";
import { deepMerge } from "grommet/utils";

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: "#cc0000",
      back: "#292929",
      card: "#bfdbf7",
      accent: "#994650",
      ok: "#00C781",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  // console.log('logged in?', isLoggedIn);
  return (
    <Grommet theme={theme} full>
      <Router>
        {!isLoggedIn ? (
          <Route path="/" exact>
            <Login />
          </Route>
        ) : (
          <Box fill align="center" justify="center">
            <Posts />
            <Button label="sign out" onClick={() => fire.auth().signOut()} />
          </Box>
        )}
      </Router>
    </Grommet>
  );
}

export default App;
