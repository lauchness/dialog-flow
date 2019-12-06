import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Global, css } from "@emotion/core";
import { color, font } from "./theme";
import ChatSession from "./ChatSession/ChatSession";
import HandleAuth from "./HandleAuth/HandleAuth";

function App() {
  const globalStyles = css`
    html {
      font-size: 62.5%;
    }

    body {
      margin: 0;
      font-family: ${font.family.regular};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: ${color.darkGray};
      min-height: 100vh;
      font-size: ${font.size.regular};
      line-height: ${font.lineHeight.regular};
    }

    code {
      font-family: ${font.family.code};
    }
  `;

  const [oAuth2Client] = useState(null);
  const [dialogflowSession, setDialogflowSession] = useState(null);

  return (
    <div>
      <Global styles={globalStyles} />
      <Switch>
        <Route
          path="/"
          exact
          render={({ history }) => (
            <ChatSession
              dialogflowSession={dialogflowSession}
              history={history}
            />
          )}
        />
        <Route
          path="/receive-auth"
          component={({ history, location }) => (
            <HandleAuth
              oAuth2Client={oAuth2Client}
              setDialogflowSession={setDialogflowSession}
              dialogflowSession={dialogflowSession}
              history={history}
              location={location}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
