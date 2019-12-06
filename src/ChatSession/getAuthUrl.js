import { OAuth2Client } from "google-auth-library";
import keys from "../secret.json";

let oauth2client = null;

export function getOAuth2Client() {
  if (oauth2client) {
    return oauth2client;
  }
  oauth2client = new OAuth2Client(
    keys.web.client_id,
    keys.web.client_secret,
    keys.web.redirect_uris[0]
  );

  return oauth2client;
}

export async function getAuthUrl() {
  getOAuth2Client();
  const authUrl = oauth2client.generateAuthUrl({
    access_type: "offline",
    scope: [
      // scopes for Dialogflow
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/dialogflow"
    ],
    redirect_uri: keys.web.redirect_uris[0]
  });

  return authUrl;
}
