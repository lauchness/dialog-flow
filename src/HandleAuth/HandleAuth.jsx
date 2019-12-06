import React, { useEffect } from "react";
import useQueryParams from "../hooks/useQueryParams";
import { getDialogflowSession } from "./getDialogflowSession";
import { HandleAuthContainer } from "./styles";

const HandleAuth = props => {
  const {
    location,
    setDialogflowSession,
    dialogflowSession,
    history,
    setOAuth2Token,
    oAuth2Token
  } = props;

  const { code } = useQueryParams(location);

  useEffect(() => {
    if (!dialogflowSession && !oAuth2Token) {
      getDialogflowSession(code).then(session => {
        setOAuth2Token(session.token);
        window.localStorage.setItem(
          "lauchie-chat-auth-token",
          JSON.stringify(session.token)
        );
        setDialogflowSession(session.sessionsClient);
      });
    } else {
      history.push("/");
    }
  }, [
    code,
    dialogflowSession,
    history,
    oAuth2Token,
    setDialogflowSession,
    setOAuth2Token
  ]);

  return <HandleAuthContainer>Authenticating...</HandleAuthContainer>;
};

export default HandleAuth;
