import { useState, useRef, useCallback } from "react";
import { OAuth2Client } from "google-auth-library";

export default (keys, scopes) => {
  // store the oAuth2Client between renders
  const oAuth2ClientRef = useRef(null);
  const localStorageKey = `${keys.web.project_id}-auth-token`;

  // instantiate oAuth2Client
  if (!oAuth2ClientRef.current) {
    oAuth2ClientRef.current = new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
    );
  }

  // get token from local storage
  const [oAuth2Token, setOAuth2Token] = useState(
    JSON.parse(window.localStorage.getItem(localStorageKey))
  );

  // need invalidate function for return
  const invalidate = useCallback(() => {
    setOAuth2Token(null);
  }, []);

  // get code query param if present in uri
  const { code } =
    window &&
    window.location.search
      .substring(1)
      .split("&")
      .reduce((previous, current) => {
        const [key, value] = current.split("=");
        previous[key] = value;
        return previous;
      }, {});

  // if we have the oAuth2Token, return early
  if (oAuth2Token) {
    // check that it's not expired
    if (oAuth2Token.expiry_date < Date.now()) {
      invalidate();
    }
    // return the tokens, client, and invalidate function
    return {
      tokens: oAuth2Token,
      oAuth2Client: oAuth2ClientRef.current,
      invalidate
    };
  }

  // if we've got the code, we're authenticating
  if (code) {
    const getTokens = async (oAuthClient, code) => {
      const { tokens } = await oAuthClient.getToken(code);
      return tokens;
    };
    // get the tokens and store them
    getTokens(oAuth2ClientRef.current, code).then(tokens => {
      oAuth2ClientRef.current.setCredentials(tokens);
      window.localStorage.setItem(localStorageKey, JSON.stringify(tokens));
      setOAuth2Token(tokens);
    });
  } else {
    // if we haven't met any above criteria, we need to generate the auth url and navigate to it
    const authUrl = oAuth2ClientRef.current.generateAuthUrl({
      access_type: "offline",
      scope: [...scopes],
      redirect_uri: keys.web.redirect_uris[0]
    });

    window.location.replace(authUrl);
  }

  return { tokens: null, oAuth2Client: oAuth2ClientRef.current, invalidate };
};
