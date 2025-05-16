import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

interface ChatInputProps {
  inputPrompt?: string;
  showFileUpload?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputPrompt,
  showFileUpload,
}) => {
  const [inputText, setInputText] = useState('');
  const { handleInputSubmit, handleFileUpload, state, dispatch } = useChatbot();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleInputSubmit(inputText);
      setInputText('');

      if (!state.isCustomChat) {
        dispatch({ type: 'TOGGLE_CUSTOM_CHAT' });
      }
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
      e.target.value = '';
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className={`border-t border-gray-200 p-3 bg-${state.theme.background} rounded-b-lg`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {inputPrompt && (
        <div className='mb-2 text-xs text-gray-500'>{inputPrompt}</div>
      )}
      <div className='flex items-center space-x-2'>
        {showFileUpload && (
          <label
            className={`cursor-pointer text-${state.theme.text} hover:text-${state.theme.primary} transition-colors`}
          >
            <Upload className='h-5 w-5' />
            <input
              type='file'
              className='hidden'
              onChange={onFileChange}
              accept='.pdf'
            />
          </label>
        )}
        <input
          type='text'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='Type a message...'
          className={`flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-${state.theme.primary} focus:border-transparent`}
        />
        <motion.button
          type='submit'
          disabled={!inputText.trim()}
          className={`p-2 rounded-full ${
            inputText.trim()
              ? `bg-${state.theme.primary} text-white hover:bg-${state.theme.secondary}`
              : 'bg-gray-200 text-gray-400'
          } transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send className='h-4 w-4' />
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ChatInput;
