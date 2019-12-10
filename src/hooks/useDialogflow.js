import { useState, useEffect } from "react";
import { SessionsClient } from "dialogflow";

export default (oAuth2, keys, sessionId) => {
  const { tokens, oAuth2Client, invalidate } = oAuth2;
  const [sessionClient, setSessionClient] = useState(null);
  const [contexts, setContexts] = useState("");

  useEffect(() => {
    if (oAuth2Client && !sessionClient) {
      // currently handling bug with constructor TODO: See this is fixed
      global.isBrowser = true;

      const client = new SessionsClient({ auth: oAuth2Client });
      setSessionClient(client);
    }
  }, [oAuth2Client, sessionClient]);

  const detectIntent = async (query, languageCode) => {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.sessionPath(
      keys.web.project_id,
      sessionId
    );

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode
        }
      }
    };

    if (contexts && contexts.length > 0) {
      request.queryParams = {
        contexts: contexts
      };
    }

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://dialogflow.googleapis.com/v2/${sessionPath}:detectIntent`;

    const responses = await fetch(proxyurl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(request)
    });

    const data = await responses.json();

    // const responses = await sessionClient.detectIntent(request);
    return data;
  };

  const executeQuery = async (query, languageCode) => {
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    let intentResponse;
    let outputContexts;

    try {
      intentResponse = await detectIntent(query, languageCode);
      // Use the context from this response for next queries
      outputContexts = intentResponse.queryResult.outputContexts;
      setContexts(outputContexts);
      return { intentResponse, outputContexts };
    } catch (error) {
      invalidate();
      return { intentResponse, outputContexts };
    }
  };

  return { executeQuery };
};
