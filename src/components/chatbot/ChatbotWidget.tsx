import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';
import ChatHeader from './ChatHeader';
import ChatConversation from './ChatConversation';
import ChatInput from './ChatInput';
import ChatFooter from './ChatFooter';
import { getConversationNodes } from '../../data/conversationFlow';

const ChatbotWidget: React.FC = () => {
  const { state, dispatch } = useChatbot();

  // Get current node
  const currentNode = getConversationNodes(state.language)[state.currentNodeId];

  if (!state.isOpen) {
    return (
      <button
        onClick={() => dispatch({ type: 'TOGGLE_OPEN' })}
        className='fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center z-50'
        aria-label='Open chat'
      >
        <MessageSquare className='h-6 w-6' />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 w-80 md:w-96 bg-gray-100 rounded-lg shadow-xl z-50 flex flex-col transition-all duration-300 ease-in-out ${
        state.isMinimized ? 'h-14' : 'h-[550px]'
      }`}
    >
      <ChatHeader />

      {!state.isMinimized && (
        <>
          <div className='flex-1 overflow-hidden flex flex-col'>
            <ChatConversation />
            <ChatInput
              inputPrompt={currentNode?.inputPrompt}
              showFileUpload={currentNode?.fileUpload}
            />
          </div>
          <ChatFooter />
        </>
      )}
    </div>
  );
};

export default ChatbotWidget;
