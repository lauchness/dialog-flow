import { SessionsClient } from "dialogflow";
import { getOAuth2Client } from "../ChatSession/getAuthUrl";

export async function getDialogflowSession(code) {
  const oauth2client = getOAuth2Client();

  // // in callback_uri handler, get the auth code from query string and obtain a token:
  const tokenResponse = await oauth2client.getToken(code);
  oauth2client.setCredentials(tokenResponse.tokens);

  global.isBrowser = true;

  // // Instantiates a session client
  return new SessionsClient({ auth: oauth2client });
}
