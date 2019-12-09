import React, { useEffect } from "react";
import { HandleAuthContainer } from "./styles";

const HandleAuth = props => {
  const { history, oAuth2Token } = props;

  useEffect(() => {
    if (oAuth2Token) {
      history.push("/");
    }
  }, [history, oAuth2Token]);

  return <HandleAuthContainer>Authenticating...</HandleAuthContainer>;
};

export default HandleAuth;
