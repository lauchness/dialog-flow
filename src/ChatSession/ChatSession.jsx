import React, { useState, useEffect } from "react";
import { ChatSessionContainer, ChatHeader } from "./styles";
import ChatArea from "./ChatArea/ChatArea";
import ChatTextArea from "./ChatTextArea/ChatTextArea";
import Chat from "../icons/Chat";
import Chevron from "../icons/Chevron";
import { color } from "../theme";
import { getAuthUrl } from "./getAuthUrl";
import { executeQuery } from "./utils";

const projectId = "testing-dialog-flow-260918";
const sessionId = "123456789";
const languageCode = "en-US";

const ChatSession = props => {
  const { history, dialogflowSession } = props;
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useState("");

  useEffect(() => {
    if (!dialogflowSession) {
      async function waitForAuthUrl() {
        return await getAuthUrl();
      }

      waitForAuthUrl().then(url => {
        window.location.replace(url);
      });
    }
    console.log(dialogflowSession);
  }, [dialogflowSession, history]);

  const handleSubmitText = text => {
    setMessages([
      ...messages,
      {
        id: new Date().getTime(),
        request: true,
        text
      }
    ]);
    executeQuery(
      dialogflowSession,
      projectId,
      sessionId,
      text,
      languageCode,
      context
    );
  };

  return (
    <ChatSessionContainer open={isOpen}>
      <ChatHeader>
        <div>
          Chat Bot <Chat fill={color.white} />
        </div>
        <div className="flip">
          <button
            className={!isOpen ? "closed" : ""}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Chevron fill={color.white} />
          </button>
        </div>
      </ChatHeader>
      <ChatArea open={isOpen} messages={messages} />
      <ChatTextArea open={isOpen} onSubmit={handleSubmitText} />
    </ChatSessionContainer>
  );
};

export default ChatSession;
