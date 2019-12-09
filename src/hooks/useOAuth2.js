import { useState, useRef } from "react";
import { OAuth2Client } from "google-auth-library";

export default (keys, scopes) => {
  const oAuth2ClientRef = useRef(null);
  const localStorageKey = `${keys.web.client_id}-auth-token`;

  if (!oAuth2ClientRef.current) {
    oAuth2ClientRef.current = new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
    );
  }

  const [oAuth2Token, setOAuth2Token] = useState(
    JSON.parse(window.localStorage.getItem(localStorageKey))
  );

  // get code if present in query params
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

  if (oAuth2Token) {
    return { tokens: oAuth2Token, oAuth2Client: oAuth2ClientRef.current };
  }

  if (code) {
    const getTokens = async (oAuthClient, code) => {
      const { tokens } = await oAuthClient.getToken(code);
      return tokens;
    };
    getTokens(oAuth2ClientRef.current, code).then(({ tokens }) => {
      oAuth2ClientRef.current.setCredentials(tokens);
      window.localStorage.setItem(localStorageKey, JSON.stringify(tokens));
      setOAuth2Token(tokens);
    });

    return { tokens: null, oAuth2Client: oAuth2ClientRef.current };
  } else {
    const authUrl = oAuth2ClientRef.current.generateAuthUrl({
      access_type: "offline",
      scope: [...scopes],
      redirect_uri: keys.web.redirect_uris[0]
    });

    window.location.replace(authUrl);
  }
};
