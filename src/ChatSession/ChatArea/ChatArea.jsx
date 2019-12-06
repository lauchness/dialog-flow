import React, { useRef, useEffect } from "react";
import { ChatAreaContainer, Message } from "./styles";

const ChatArea = props => {
  const containerRef = useRef(null);
  const { open, messages } = props;

  useEffect(() => {
    if (containerRef.current) {
      debugger;
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight
      });
    }
  }, [messages]);

  return (
    <ChatAreaContainer ref={containerRef} open={open}>
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
