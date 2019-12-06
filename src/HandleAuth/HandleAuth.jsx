import React, { useEffect } from "react";
import useQueryParams from "../hooks/useQueryParams";
import { getDialogflowSession } from "./getDialogflowSession";
import { HandleAuthContainer } from "./styles";

const HandleAuth = props => {
  const { location, setDialogflowSession, dialogflowSession, history } = props;

  const { code } = useQueryParams(location);

  useEffect(() => {
    if (!dialogflowSession) {
      getDialogflowSession(code).then(session => {
        setDialogflowSession(session);
      });
    } else {
      history.push("/");
    }
  }, [code, dialogflowSession, history, setDialogflowSession]);

  return <HandleAuthContainer>Authenticating...</HandleAuthContainer>;
};

export default HandleAuth;
