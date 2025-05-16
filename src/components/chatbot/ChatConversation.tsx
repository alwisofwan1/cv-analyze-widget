import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from './MessageBubble';
import OptionButtons from './OptionButtons';
import { useChatbot } from '../../context/ChatbotContext';
import { getConversationNodes } from '../../data/conversationFlow';

const ChatConversation: React.FC = () => {
  const { state } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentNode = getConversationNodes(state.language)[state.currentNodeId];

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [state.messages]);

  return (
    <motion.div
      className={`flex-1 p-4 overflow-y-auto bg-${state.theme.background}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {state.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {state.isTyping && (
          <motion.div
            className='flex justify-start mb-3'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div
              className={`bg-${state.theme.botBubble} px-4 py-2 rounded-lg rounded-tl-none`}
            >
              <div className='typing-animation'>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
              </div>
            </div>
          </motion.div>
        )}

        <div className='mt-8'>
          {!state.isTyping && !state.isCustomChat && currentNode?.options && (
            <OptionButtons options={currentNode.options} />
          )}
        </div>
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </motion.div>
  );
};

export default ChatConversation;
