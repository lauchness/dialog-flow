async function detectIntent(
  sessionClient,
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

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
      Authorization:
        "Bearer ya29.c.Kl20BxK1rX917-w4UxVltUrK5U2Lc3LzQY4YNSYFWUMJMh4QWJJMCebLyJYlzn9SXWwc_0NAi0XNN5_7f8cnrTH3SVsT1P0g-q0G6ABhObrMkRkP5bMeZCYyeMzd4ro",
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(request)
  });

  // const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

export async function executeQuery(
  sessionClient,
  projectId,
  sessionId,
  query,
  languageCode,
  context
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
      languageCode
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
