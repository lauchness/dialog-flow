import React, { useState } from 'react';
import { ChatSessionContainer, ChatHeader } from './styles';
import ChatArea from './ChatArea/ChatArea';
import ChatTextArea from './ChatTextArea/ChatTextArea';
import Chat from '../icons/Chat';
import Chevron from '../icons/Chevron';
import { color } from '../theme';
import useDialogflow from '../hooks/useDialogflow';
import keys from '../secret.json';
import { Vocabulary } from '../vocabulary'

const sessionId = '123456789';
const languageCode = 'en-US';

const ChatSession = props => {
  const [context, setContext] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  const executeQuery = async query => {
    const request = {
      projectId: keys.web.project_id,
      sessionId: sessionId,
      query,
      context: context,
      languageCode: languageCode
    };

    const response = await props.apiDoc.does(Vocabulary.detectIntents)
      .map(operation => operation.invoke(request))
      .getOrUndefined()
    
    return response.data;
  };

  const handleSubmitText = async text => {
    const myRequest = {
      id: new Date().getTime(),
      request: true,
      text
    };
    setMessages([...messages, myRequest]);
    setTimeout(async () => {
      const loading = {
        id: 'Loading',
        request: false,
        text: '...'
      };
      setMessages([...messages, myRequest, loading]);
      const response = await executeQuery(text); // work here because the new returned type is a SemanticHttpResponse
      
      const id = await response.getOneValue(Vocabulary.responseId)
      const queryResult = await response.getOne(Vocabulary.queryResult)
      const fulfillmentText = await queryResult.getOneValue(Vocabulary.fulfillmentText)

      setMessages([
        ...messages,
        myRequest,
        { id, request: false, text: fulfillmentText }
      ]);
    }, 500);
  };

  return (
    <ChatSessionContainer open={isOpen}>
      <ChatHeader>
        <div>
          Chat Bot <Chat fill={color.white} />
        </div>
        <div className="flip">
          <button
            className={!isOpen ? 'closed' : ''}
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
