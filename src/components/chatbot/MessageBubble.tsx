import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../../types/chatbot';
import { useChatbot } from '../../context/ChatbotContext';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { state } = useChatbot();
  const isBot = message.type === 'bot';

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <motion.div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <motion.div
        className={`
          max-w-[80%] py-2 px-4 rounded-lg shadow-sm
          ${
            isBot
              ? `bg-${state.theme.botBubble} text-${state.theme.text} rounded-tl-none`
              : `bg-${state.theme.userBubble} text-white rounded-tr-none`
          }
        `}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className='text-sm'>{formatMessage(message.content)}</p>
      </motion.div>
    </motion.div>
  );
};

export default MessageBubble;
