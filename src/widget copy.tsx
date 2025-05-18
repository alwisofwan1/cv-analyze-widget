/* eslint-disable react-refresh/only-export-components */
import { createRoot } from 'react-dom/client';
import { ChatbotProvider } from './context/ChatbotContext';
import { ChatbotWidget } from './components/chatbot';

// Define the FaqChatbot type for global usage
type FaqChatbotType = {
  initialized: boolean;
  init: (userConfig?: any) => FaqChatbotType | void;
};

declare global {
  interface Window {
    FaqChatbot?: FaqChatbotType;
  }
}

// Export the widget as a single self-contained module
export default (() => {
  // Create the widget module
  const FaqChatbot = {
    initialized: false,
    init: function (userConfig: any = {}) {
      if (this.initialized) {
        console.warn('FaqChatbot already initialized');
        return;
      }

      console.log('Initializing FaqChatbot with config:', userConfig);

      // Create container if it doesn't exist
      let widgetContainer = document.getElementById('faq-chatbot-widget');
      if (!widgetContainer) {
        widgetContainer = document.createElement('div');
        widgetContainer.id = 'faq-chatbot-widget';
        document.body.appendChild(widgetContainer);
      }

      // Render the widget
      const root = createRoot(widgetContainer);
      root.render(
        <ChatbotProvider
          theme={{
            primary: userConfig.primary || 'red-600',
            secondary: userConfig.secondary || 'red-700',
            background: userConfig.background || 'gray-50',
            text: userConfig.text || 'gray-800',
            botBubble: userConfig.botBubble || 'white',
            userBubble: userConfig.userBubble || 'red-600',
            ...userConfig.theme,
          }}
        >
          <ChatbotWidget />
        </ChatbotProvider>
      );

      this.initialized = true;
      return this;
    },
  };

  // Expose to window object for browser usage
  if (typeof window !== 'undefined') {
    window.FaqChatbot = FaqChatbot;
  }

  return FaqChatbot;
})();
