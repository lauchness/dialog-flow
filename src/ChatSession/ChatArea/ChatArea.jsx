import React from "react";
import { ChatAreaContainer, Message } from "./styles";

const ChatArea = props => {
  const { open, messages } = props;
  return (
    <ChatAreaContainer open={open}>
      {messages &&
        messages.length > 0 &&
        messages.map(message => (
          <Message
            key={message.id}
            className={message.request ? "request" : "response"}
          >
            {message.text}
          </Message>
        ))}
    </ChatAreaContainer>
  );
};

export default ChatArea;
