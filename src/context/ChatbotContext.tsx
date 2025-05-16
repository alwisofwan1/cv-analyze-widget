import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ChatbotState,
  ChatbotAction,
  ChatbotContextType,
  Message,
  MessageType,
  // Language,
  ThemeConfig,
} from '../types/chatbot';
import {
  INITIAL_NODE_ID,
  getConversationNodes,
  getNextNode,
  processUserInput,
  processFileUpload,
} from '../data/conversationFlow';

const defaultTheme: ThemeConfig = {
  primary: 'green-600',
  secondary: 'green-700',
  background: 'gray-50',
  text: 'gray-800',
  botBubble: 'white',
  userBubble: 'green-600',
};

const initialState: ChatbotState = {
  isOpen: false,
  isMinimized: false,
  isTyping: false,
  messages: [],
  currentNodeId: INITIAL_NODE_ID,
  language: 'id',
  userData: {},
  isCustomChat: false,
  theme: defaultTheme,
};

export const ChatbotContext = createContext<ChatbotContextType | undefined>(
  undefined
);

const chatbotReducer = (
  state: ChatbotState,
  action: ChatbotAction
): ChatbotState => {
  switch (action.type) {
    case 'TOGGLE_OPEN':
      return { ...state, isOpen: !state.isOpen };
    case 'TOGGLE_MINIMIZE':
      return { ...state, isMinimized: !state.isMinimized };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_CURRENT_NODE':
      return { ...state, currentNodeId: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_USER_DATA':
      return { ...state, userData: { ...state.userData, ...action.payload } };
    case 'TOGGLE_CUSTOM_CHAT':
      return { ...state, isCustomChat: true };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'RESET':
      return { ...initialState, isOpen: state.isOpen, theme: state.theme };
    default:
      return state;
  }
};

export const ChatbotProvider: React.FC<{
  children: React.ReactNode;
  theme?: Partial<ThemeConfig>;
}> = ({ children, theme = {} }) => {
  const [state, dispatch] = useReducer(chatbotReducer, {
    ...initialState,
    theme: { ...defaultTheme, ...theme },
  });

  useEffect(() => {
    const savedState = localStorage.getItem('chatbotState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({
          type: 'SET_LANGUAGE',
          payload: parsedState.language || 'id',
        });

        if (parsedState.messages && parsedState.messages.length > 0) {
          parsedState.messages.forEach((message: Message) => {
            dispatch({ type: 'ADD_MESSAGE', payload: message });
          });
        }

        if (parsedState.currentNodeId) {
          dispatch({
            type: 'SET_CURRENT_NODE',
            payload: parsedState.currentNodeId,
          });
        }
      } catch (error) {
        console.error('Error parsing saved chatbot state:', error);
      }
    } else {
      initializeChat();
    }
  }, []);

  useEffect(() => {
    const stateToSave = {
      messages: state.messages,
      currentNodeId: state.currentNodeId,
      language: state.language,
    };
    localStorage.setItem('chatbotState', JSON.stringify(stateToSave));
  }, [state.messages, state.currentNodeId, state.language]);

  const initializeChat = useCallback(() => {
    const welcomeNode = getConversationNodes(state.language)[INITIAL_NODE_ID];

    if (welcomeNode && welcomeNode.messages) {
      welcomeNode.messages.forEach((message, index) => {
        setTimeout(() => {
          sendMessage(message, 'bot');
        }, index * 700);
      });
    }
  }, [state.language]);

  const sendMessage = useCallback((content: string, type: MessageType) => {
    const message: Message = {
      id: uuidv4(),
      type,
      content,
      timestamp: Date.now(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: message });
  }, []);

  const handleOptionClick = useCallback(
    (optionId: string) => {
      const nodes = getConversationNodes(state.language);
      const currentNode = nodes[state.currentNodeId];

      const selectedOption = currentNode.options?.find(
        (option) => option.id === optionId
      );

      if (!selectedOption) return;

      sendMessage(selectedOption.label, 'user');

      if (selectedOption.action === 'language_id') {
        dispatch({ type: 'SET_LANGUAGE', payload: 'id' });
        setTimeout(() => {
          dispatch({ type: 'RESET' });
          const nextNodeId = 'main_menu';
          dispatch({ type: 'SET_CURRENT_NODE', payload: nextNodeId });

          const nextNode = getConversationNodes('id')[nextNodeId];
          if (nextNode && nextNode.messages) {
            nextNode.messages.forEach((message, index) => {
              setTimeout(() => {
                sendMessage(message, 'bot');
              }, 500 + index * 700);
            });
          }
        }, 500);
        return;
      }

      if (selectedOption.action === 'language_en') {
        dispatch({ type: 'SET_LANGUAGE', payload: 'en' });
        setTimeout(() => {
          dispatch({ type: 'RESET' });
          const nextNodeId = 'main_menu';
          dispatch({ type: 'SET_CURRENT_NODE', payload: nextNodeId });

          const nextNode = getConversationNodes('en')[nextNodeId];
          if (nextNode && nextNode.messages) {
            nextNode.messages.forEach((message, index) => {
              setTimeout(() => {
                sendMessage(message, 'bot');
              }, 500 + index * 700);
            });
          }
        }, 500);
        return;
      }

      const nextNodeId = getNextNode(selectedOption.action);

      dispatch({ type: 'SET_TYPING', payload: true });

      setTimeout(() => {
        dispatch({ type: 'SET_CURRENT_NODE', payload: nextNodeId });
        dispatch({ type: 'SET_TYPING', payload: false });

        const nextNode = nodes[nextNodeId];
        if (nextNode && nextNode.messages) {
          nextNode.messages.forEach((message, index) => {
            setTimeout(() => {
              sendMessage(message, 'bot');
            }, index * 700);
          });
        }
      }, 1000);
    },
    [state.currentNodeId, state.language, sendMessage]
  );

  const handleInputSubmit = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      sendMessage(text, 'user');

      if (state.isCustomChat) {
        dispatch({ type: 'SET_TYPING', payload: true });

        setTimeout(() => {
          dispatch({ type: 'SET_TYPING', payload: false });
          sendMessage(
            'I understand you want to chat. How can I help you today?',
            'bot'
          );
        }, 1000);
        return;
      }

      const nextNodeId = processUserInput(
        text,
        state.currentNodeId
        // state.language
      );

      dispatch({ type: 'SET_TYPING', payload: true });

      setTimeout(() => {
        dispatch({ type: 'SET_CURRENT_NODE', payload: nextNodeId });
        dispatch({ type: 'SET_TYPING', payload: false });

        const nodes = getConversationNodes(state.language);
        const nextNode = nodes[nextNodeId];
        if (nextNode && nextNode.messages) {
          nextNode.messages.forEach((message, index) => {
            setTimeout(() => {
              sendMessage(message, 'bot');
            }, index * 700);
          });
        }
      }, 1000);
    },
    [state.currentNodeId, state.language, state.isCustomChat, sendMessage]
  );

  const handleFileUpload = useCallback(
    (file: File) => {
      sendMessage(`Uploaded: ${file.name}`, 'user');

      const nextNodeId = processFileUpload(file, state.currentNodeId);

      dispatch({ type: 'SET_TYPING', payload: true });

      setTimeout(() => {
        dispatch({ type: 'SET_CURRENT_NODE', payload: nextNodeId });
        dispatch({ type: 'SET_TYPING', payload: false });

        const nodes = getConversationNodes(state.language);
        const nextNode = nodes[nextNodeId];
        if (nextNode && nextNode.messages) {
          nextNode.messages.forEach((message, index) => {
            setTimeout(() => {
              sendMessage(message, 'bot');
            }, index * 700);
          });
        }
      }, 1500);
    },
    [state.currentNodeId, state.language, sendMessage]
  );

  const handleBack = useCallback(() => {
    const nodes = getConversationNodes(state.language);
    const currentNode = nodes[state.currentNodeId];

    if (currentNode.back) {
      sendMessage('Kembali', 'user');

      dispatch({ type: 'SET_TYPING', payload: true });

      setTimeout(() => {
        const backNodeId = currentNode.back as string;
        dispatch({ type: 'SET_CURRENT_NODE', payload: backNodeId });
        dispatch({ type: 'SET_TYPING', payload: false });

        const backNode = nodes[backNodeId];
        if (backNode && backNode.messages) {
          backNode.messages.forEach((message, index) => {
            setTimeout(() => {
              sendMessage(message, 'bot');
            }, index * 700);
          });
        }
      }, 1000);
    }
  }, [state.currentNodeId, state.language, sendMessage]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setTimeout(initializeChat, 300);
  }, [initializeChat]);

  const contextValue: ChatbotContextType = {
    state,
    dispatch,
    sendMessage,
    handleOptionClick,
    handleInputSubmit,
    handleFileUpload,
    handleBack,
    reset,
  };

  return (
    <ChatbotContext.Provider value={contextValue}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = (): ChatbotContextType => {
  const context = React.useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
