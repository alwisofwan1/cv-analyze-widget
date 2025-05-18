import ReactDOM from 'react-dom/client';
import { ChatbotProvider } from './context/ChatbotContext';
import { ChatbotWidget } from './components/chatbot';

// Membuat Custom Element bernama <my-widget>
class MyWidgetElement extends HTMLElement {
  connectedCallback() {
    const root = ReactDOM.createRoot(this);
    root.render(
      <ChatbotProvider
        theme={{
          primary: 'red-600',
          secondary: 'red-700',
          background: 'gray-50',
          text: 'gray-800',
          botBubble: 'white',
          userBubble: 'red-600',
        }}
      >
        <ChatbotWidget />
      </ChatbotProvider>
    );
  }
}

customElements.define('my-widget', MyWidgetElement);
