import React, { useState } from "react";
import { ChatSessionContainer, ChatHeader } from "./styles";
import ChatArea from "./ChatArea/ChatArea";
import ChatTextArea from "./ChatTextArea/ChatTextArea";
import Chat from "../icons/Chat";
import Chevron from "../icons/Chevron";
import { color } from "../theme";
import useDialogflow from "../hooks/useDialogflow";
import keys from "../secret.json";

const sessionId = "123456789";
const languageCode = "en-US";

const ChatSession = props => {
  const { oAuth2 } = props;
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  const { executeQuery } = useDialogflow(oAuth2, keys, sessionId);

  const handleSubmitText = async text => {
    const myRequest = {
      id: new Date().getTime(),
      request: true,
      text
    };
    setMessages([...messages, myRequest]);
    const response = await executeQuery(text, languageCode);
    setMessages([
      ...messages,
      myRequest,
      {
        id: response.intentResponse.responseId,
        request: false,
        text: response.intentResponse.queryResult.fulfillmentText
      }
    ]);
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
