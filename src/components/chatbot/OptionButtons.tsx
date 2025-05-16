import React from 'react';
import { Option } from '../../types/chatbot';
import { useChatbot } from '../../context/ChatbotContext';
import { motion } from 'framer-motion';

interface OptionButtonsProps {
  options: Option[];
}

const OptionButtons: React.FC<OptionButtonsProps> = ({ options }) => {
  const { handleOptionClick } = useChatbot();

  return (
    <motion.div
      className='flex flex-col space-y-2 mb-4'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.5 }}
    >
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleOptionClick(option.id)}
          className='bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-md border border-gray-200 shadow-sm transition-colors duration-200 text-sm text-left'
        >
          {option.label}
        </button>
      ))}
    </motion.div>
  );
};

export default OptionButtons;
