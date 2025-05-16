import React from 'react';
import { MessageSquare, Minimize2, Maximize2, X } from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';

const ChatHeader: React.FC = () => {
  const { state, dispatch } = useChatbot();

  const handleToggleMinimize = () => {
    dispatch({ type: 'TOGGLE_MINIMIZE' });
  };

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_OPEN' });
  };

  return (
    <div
      className={`flex items-center justify-between bg-${state.theme.primary} text-white p-3 rounded-t-lg`}
    >
      <div className='flex items-center'>
        <MessageSquare className='h-6 w-6 mr-2' />
        <h3 className='font-medium'>FAQ Assistant</h3>
      </div>
      <div className='flex items-center space-x-2'>
        {state.isMinimized ? (
          <button
            onClick={handleToggleMinimize}
            className='text-white hover:bg-black/10 rounded-full p-1 transition-colors duration-200'
            aria-label='Maximize'
          >
            <Maximize2 className='h-4 w-4' />
          </button>
        ) : (
          <button
            onClick={handleToggleMinimize}
            className='text-white hover:bg-black/10 rounded-full p-1 transition-colors duration-200'
            aria-label='Minimize'
          >
            <Minimize2 className='h-4 w-4' />
          </button>
        )}
        <button
          onClick={handleClose}
          className='text-white hover:bg-black/10 rounded-full p-1 transition-colors duration-200'
          aria-label='Close'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
