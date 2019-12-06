import React, { useState } from "react";
import { ChatTextAreaContainer } from "./styles";
import Return from "../../icons/Return";
import { color } from "../../theme";

const ChatTextArea = props => {
  const { open, onSubmit } = props;
  const [textValue, setTextValue] = useState("");
  return (
    <ChatTextAreaContainer open={open}>
      <textarea
        value={textValue}
        onChange={e => {
          e.target && setTextValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onSubmit(textValue);
          setTextValue("");
        }}
      >
        <Return fill={color.white} />
      </button>
    </ChatTextAreaContainer>
  );
};

export default ChatTextArea;
