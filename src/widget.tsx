import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatbotWidget } from './components/ChatbotWidget';
import { DEFAULT_CONFIG } from './lib/constants';
import { sendMessage } from './lib/api';
import './styles/widget.css';

const widgetContainer = document.createElement('div');
widgetContainer.id = 'faq-chatbot-widget';
document.body.appendChild(widgetContainer);

const root = createRoot(widgetContainer);

declare global {
  interface Window {
    FaqChatbot?: {
      init: (config: Record<string, unknown>) => void;
    };
  }
}

window.FaqChatbot = {
  init: (userConfig) => {
    const config = { ...DEFAULT_CONFIG, ...userConfig };

    root.render(
      <ChatbotWidget
        onSendMessage={(message: string) =>
          sendMessage(config.endpoint, message)
        }
        {...config}
      />
    );
  },
};
