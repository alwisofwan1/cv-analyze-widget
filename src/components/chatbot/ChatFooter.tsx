import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

const ChatFooter: React.FC = () => {
  const { reset } = useChatbot();

  const handleReset = () => {
    reset();
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className='px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center'>
      <span>© {currentYear} Powered By PhantomX</span>
      <button
        onClick={handleReset}
        className='text-gray-500 hover:text-gray-700 transition-colors flex items-center'
      >
        <RefreshCw className='h-3 w-3 mr-1' />
        <span>Restart</span>
      </button>
    </div>
  );
};

export default ChatFooter;
