async function detectIntent(
  sessionClient,
  projectId,
  sessionId,
  query,
  contexts,
  languageCode,
  oAuth2Token
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = `projects/${projectId}/agent/sessions/${sessionId}`;

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
      Authorization: `Bearer ${oAuth2Token.access_token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(request)
  });

  const data = await responses.json();

  // const responses = await sessionClient.detectIntent(request);
  return data;
}

export async function executeQuery(
  sessionClient,
  projectId,
  sessionId,
  query,
  languageCode,
  context,
  oAuth2Token
) {
  // Keeping the context across queries let's us simulate an ongoing conversation with the bot
  let intentResponse;

  try {
    console.log(`Sending Query: ${query}`);
    intentResponse = await detectIntent(
      sessionClient,
      projectId,
      sessionId,
      query,
      context,
      languageCode,
      oAuth2Token
    );
    console.log("Detected intent");
    console.log(
      `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
    );

    // Use the context from this response for next queries
    const outputContexts = intentResponse.queryResult.outputContexts;
    return { intentResponse, outputContexts };
  } catch (error) {
    console.log(error);
  }
}
