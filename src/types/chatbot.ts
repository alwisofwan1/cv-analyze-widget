// Message types
export type MessageType = 'bot' | 'user';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: number;
}

// Option button type
export interface Option {
  id: string;
  label: string;
  action: string;
}

// Node in conversation flow
export interface ConversationNode {
  id: string;
  messages: string[];
  options?: Option[];
  inputPrompt?: string;
  input?: boolean;
  fileUpload?: boolean;
  back?: string;
}

// Language type
export type Language = 'id' | 'en';

// Theme configuration
export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  botBubble: string;
  userBubble: string;

}

// Chatbot state interface
export interface ChatbotState {
  isOpen: boolean;
  isMinimized: boolean;
  isTyping: boolean;
  messages: Message[];
  currentNodeId: string;
  language: Language;
  userData: Record<string, any>;
  isCustomChat: boolean;
  theme: ThemeConfig;
}

// Action types
export type ChatbotAction =
  | { type: 'TOGGLE_OPEN' }
  | { type: 'TOGGLE_MINIMIZE' }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_CURRENT_NODE'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_USER_DATA'; payload: Record<string, any> }
  | { type: 'TOGGLE_CUSTOM_CHAT' }
  | { type: 'SET_THEME'; payload: ThemeConfig }
  | { type: 'RESET' };

// Context interface
export interface ChatbotContextType {
  state: ChatbotState;
  dispatch: React.Dispatch<ChatbotAction>;
  sendMessage: (content: string, type: MessageType) => void;
  handleOptionClick: (optionId: string) => void;
  handleInputSubmit: (text: string) => void;
  handleFileUpload: (file: File) => void;
  handleBack: () => void;
  reset: () => void;
}