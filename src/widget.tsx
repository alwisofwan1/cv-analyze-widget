import ReactDOM from 'react-dom/client';
import { ChatbotProvider } from './context/ChatbotContext';
import { ChatbotWidget } from './components/chatbot';

class MyWidgetElement extends HTMLElement {
  connectedCallback() {
    // Gunakan Shadow DOM agar widget terisolasi
    const shadow = this.attachShadow({ mode: 'open' });

    // Mount point React
    const mountPoint = document.createElement('div');
    shadow.appendChild(mountPoint);
    const style = document.createElement('style');
    style.textContent = `@tailwind base; @tailwind components; @tailwind utilities;`; // Atau CSS hasil build
    shadow.appendChild(style);

    const root = ReactDOM.createRoot(mountPoint);

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
