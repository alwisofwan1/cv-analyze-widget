// @ts-nocheck
(function () {
  // Configuration options
  const CONFIG = {
    widgetId: 'cv-analysis-widget',
    containerId: 'cv-analysis-widget-container',
    defaultTheme: {
      primary: '#f33',
      secondary: '#7f3737',
      text: '#1f2937',
      lightText: '#64748b',
      background: '#ffffff',
      panelBackground: 'rgba(255, 255, 255, 0.95)',
      widgetWidth: '55px',
      widgetHeight: '55px',
      // logo: 'https://cdn.jsdelivr.net/gh/alwi/cv-analysis-widget@main/public/logo.png',
    },
  };

  // Utility functions
  const DOM = {
    create(tag, id = null, className = null, innerHTML = null) {
      const element = document.createElement(tag);
      if (id) element.id = id;
      if (className) element.className = className;
      if (innerHTML) element.innerHTML = innerHTML;
      return element;
    },

    get(id) {
      return document.getElementById(id);
    },
  };

  // Widget state management
  const WidgetState = {
    theme: { ...CONFIG.defaultTheme },

    updateTheme(newTheme) {
      this.theme = { ...this.theme, ...newTheme };
      this.applyTheme();
    },

    applyTheme() {
      const root = DOM.get(CONFIG.containerId);
      if (!root) return;

      // Apply theme to CSS variables
      root.style.setProperty('--primary-color', this.theme.primary);
      root.style.setProperty('--secondary-color', this.theme.secondary);
      root.style.setProperty('--text-color', this.theme.text);
      root.style.setProperty('--light-text-color', this.theme.lightText);
      root.style.setProperty('--background-color', this.theme.background);
      root.style.setProperty('--panel-background', this.theme.panelBackground);
      root.style.setProperty('--widget-width', this.theme.widgetWidth);
      root.style.setProperty('--widget-height', this.theme.widgetHeight);
    },
  };

  // Widget UI components
  const WidgetUI = {
    createStylesheet() {
      const style = document.createElement('style');
      style.textContent = `
        #${CONFIG.containerId} {
          --primary-color: ${WidgetState.theme.primary};
          --secondary-color: ${WidgetState.theme.secondary};
          --text-color: ${WidgetState.theme.text};
          --light-text-color: ${WidgetState.theme.lightText};
          --background-color: ${WidgetState.theme.background};
          --panel-background: ${WidgetState.theme.panelBackground};
          
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
        }

        #cv-analysis-widget-button {
          width: var(--widget-width);
          height: var(--widget-height);
          border-radius: 50%;
          background: linear-gradient(145deg, var(--primary-color), var(--secondary-color));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          overflow: hidden;
        }

        #cv-analysis-widget-button:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }

        #cv-analysis-widget-button::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        #cv-analysis-widget-button:hover::after {
          transform: translateX(100%);
        }

        #cv-analysis-widget-panel {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          height: 550px;
          background: var(--panel-background);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: none;
          flex-direction: column;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        #cv-analysis-widget-panel.open {
          display: flex;
          transform: translateY(0);
          opacity: 1;
        }

        #cv-analysis-widget-header {
          background: linear-gradient(145deg, var(--primary-color), var(--secondary-color));
          color: white;
          padding: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .header-left {
          display: flex;
          align-items: center;
        }
            
        .header-close {
          display: none;
          cursor: pointer;
          padding: 5px;
        }
            
       .header-close svg {
          width: 24px;
          height: 24px;
          transition: transform 0.3s ease;
        }

        .header-close:active svg {
          transform: scale(0.9);
        }

        #cv-analysis-widget-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: linear-gradient(180deg, #f8fafc, #f1f5f9);
          scroll-behavior: smooth;
        }

        .widget-message {
          margin-bottom: 15px;
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 16px;
          line-height: 1.5;
          animation: messagePopIn 0.3s ease-out;
          position: relative;
        }

        @keyframes messagePopIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .widget-message.bot {
          background: var(--background-color);
          color: var(--text-color);
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .widget-message.user {
          background: linear-gradient(145deg, var(--primary-color), var(--secondary-color));
          color: white;
          border-bottom-right-radius: 4px;
          margin-left: auto;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);
        }

        #cv-analysis-widget-input-area {
          padding: 15px;
          background: var(--background-color);
          border-top: 1px solid #e5e7eb;
        }

        #cv-analysis-widget-file-upload {
          padding: 12px;
          margin-bottom: 12px;
          background: #f8fafc;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          color: var(--light-text-color);
          transition: all 0.3s ease;
        }

        #cv-analysis-widget-file-upload:hover {
          background: #f1f5f9;
          border-color: var(--secondary-color);
          color: var(--secondary-color);
          transform: translateY(-2px);
        }

        #cv-analysis-widget-input-container {
          display: flex;
          gap: 10px;
        }

        #cv-analysis-widget-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          outline: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        #cv-analysis-widget-input:focus {
          border-color: var(--secondary-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        #cv-analysis-widget-send {
          background: linear-gradient(145deg, var(--primary-color), var(--secondary-color));
          color: white;
          border: none;
          border-radius: 12px;
          padding: 0 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        #cv-analysis-widget-send:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        #cv-analysis-widget-send:disabled {
          background: #e2e8f0;
          cursor: not-allowed;
        }

        .widget-loading {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: var(--background-color);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          max-width: 85%;
          margin-bottom: 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          animation: loadingPulse 1.5s ease-in-out infinite;
        }

        .widget-loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid #e2e8f0;
          border-top-color: var(--secondary-color);
          border-radius: 50%;
          margin-right: 12px;
          animation: widget-spin 1s linear infinite;
        }

        #cv-analysis-widget-footer {
          padding: 10px;
          text-align: center;
          background: var(--background-color);
          color: var(--light-text-color);
          font-size: 12px;
          font-weight: 500;
          border-top: 1px solid #e5e7eb;
        }

        @keyframes widget-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes loadingPulse {
          0% { transform: scale(1); }
          50% { transform: scale(0.97); }
          100% { transform: scale(1); }
        }

        /* Custom Scrollbar */
        #cv-analysis-widget-messages::-webkit-scrollbar {
          width: 6px;
        }

        #cv-analysis-widget-messages::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        #cv-analysis-widget-messages::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        #cv-analysis-widget-messages::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Mobile Responsive Styles */
        @media screen and (max-width: 768px) {
          #${CONFIG.containerId} {
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
          }

          #cv-analysis-widget-button {
            bottom: 20px;
            right: 20px;
            position: fixed;
          }

          #cv-analysis-widget-panel {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            border-radius: 0;
            margin: 0;
          }

          #cv-analysis-widget-panel.open {
            transform: none;
          }

          #cv-analysis-widget-header {
            border-radius: 0;
          }

          #cv-analysis-widget-messages {
            border-radius: 0;
          }

          #cv-analysis-widget-input-area {
            border-radius: 0;
            padding: 10px;
          }

          #cv-analysis-widget-file-upload {
            margin: 8px;
          }

          #cv-analysis-widget-input-container {
            padding: 0 8px;
          }

          #cv-analysis-widget-input {
            font-size: 16px; /* Prevent zoom on mobile */
          }

          /* Adjust message bubbles for mobile */
          .widget-message {
            max-width: 90%;
          }

          #cv-analysis-widget-panel {
            transition: transform 0.3s ease, opacity 0.3s ease;
            transform: translateY(100%);
          }
            
          #cv-analysis-widget-panel.open {
            transform: translateY(0);
          }
        }

        /* Handle screen orientation */
        @media screen and (max-width: 768px) and (orientation: landscape) {
          #cv-analysis-widget-panel {
            height: 100%;
          }

          #cv-analysis-widget-messages {
            height: calc(100% - 140px);
          }
        }

        @media screen and (max-width: 768px) {
          .header-close {
            display: block; /* Show close button on mobile */
          }

          #cv-analysis-widget-header {
            padding: 15px;
          }
        }

        /* Hover effect only for non-touch devices */
        @media (hover: hover) {
          .header-close:hover svg {
            transform: rotate(90deg);
          }
        }
      `;
      return style;
    },

    createWidgetStructure() {
      // Create widget container
      const container = DOM.create('div', CONFIG.containerId);

      // Create toggle button
      const button = DOM.create(
        'div',
        'cv-analysis-widget-button',
        null,
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>'
      );

      // Create panel
      const panel = DOM.create('div', 'cv-analysis-widget-panel');

      const header = DOM.create(
        'div',
        'cv-analysis-widget-header',
        null,
        `
        <div class="header-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          CV Analysis Assistant
        </div>
        <div id="cv-analysis-widget-close" class="header-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
      `
      );

      // Create messages container
      const messages = DOM.create('div', 'cv-analysis-widget-messages');

      // Create input area
      const inputArea = DOM.create('div', 'cv-analysis-widget-input-area');

      // Create file upload
      const fileUpload = DOM.create(
        'div',
        'cv-analysis-widget-file-upload',
        null,
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 5px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> Upload your CV (PDF)'
      );

      const fileInput = DOM.create('input');
      fileInput.type = 'file';
      fileInput.accept = '.pdf,.doc,.docx';
      fileInput.style.display = 'none';

      // Create input container
      const inputContainer = DOM.create(
        'div',
        'cv-analysis-widget-input-container'
      );

      const input = DOM.create('input', 'cv-analysis-widget-input');
      input.type = 'text';
      input.placeholder = 'Ask a question about your CV...';

      const sendButton = DOM.create(
        'button',
        'cv-analysis-widget-send',
        null,
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
      );
      sendButton.disabled = true;

      // Create footer
      const footer = DOM.create(
        'div',
        'cv-analysis-widget-footer',
        null,
        'Powered by PhantomX'
      );

      // Assemble the widget
      inputContainer.appendChild(input);
      inputContainer.appendChild(sendButton);

      inputArea.appendChild(fileUpload);
      inputArea.appendChild(fileInput);
      inputArea.appendChild(inputContainer);

      panel.appendChild(header);
      panel.appendChild(messages);
      panel.appendChild(inputArea);
      panel.appendChild(footer);

      container.appendChild(button);
      container.appendChild(panel);

      return {
        container,
        button,
        panel,
        messages,
        fileUpload,
        fileInput,
        input,
        sendButton,
      };
    },
  };

  // Widget functionality
  const WidgetController = {
    elements: null,

    init() {
      // Add stylesheet
      document.head.appendChild(WidgetUI.createStylesheet());

      // Create widget elements
      this.elements = WidgetUI.createWidgetStructure();

      // Check if we're in embedded mode
      const targetElement = DOM.get(CONFIG.widgetId);
      if (targetElement) {
        this.initEmbeddedMode(targetElement);
      } else {
        document.body.appendChild(this.elements.container);
      }

      // Set up event listeners
      this.setupEventListeners();

      // Add initial message
      this.addMessage(
        'bot',
        'Hello! Upload your CV and I can analyze it for you.'
      );

      // Apply theme
      WidgetState.applyTheme();
    },

    initEmbeddedMode(targetElement) {
      targetElement.appendChild(this.elements.container);
      this.elements.panel.classList.add('open');

      // Adjust styles for embedded mode
      this.elements.container.style.position = 'relative';
      this.elements.container.style.bottom = 'auto';
      this.elements.container.style.right = 'auto';

      this.elements.button.style.display = 'none';

      this.elements.panel.style.position = 'relative';
      this.elements.panel.style.bottom = 'auto';
      this.elements.panel.style.right = 'auto';
      this.elements.panel.style.width = '100%';
      this.elements.panel.style.height = '100%';
    },

    setupEventListeners() {
      // Toggle panel
      this.elements.button.addEventListener('click', () => {
        this.elements.panel.classList.toggle('open');
      });

      // File upload
      this.elements.fileUpload.addEventListener('click', () => {
        this.elements.fileInput.click();
      });

      this.elements.fileInput.addEventListener(
        'change',
        this.handleFileUpload.bind(this)
      );

      // Input handling
      this.elements.input.addEventListener('input', () => {
        this.elements.sendButton.disabled =
          this.elements.input.value.trim() === '';
      });

      this.elements.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.elements.input.value.trim() !== '') {
          this.sendMessage();
        }
      });

      this.elements.sendButton.addEventListener(
        'click',
        this.sendMessage.bind(this)
      );

      // Button ripple effect
      this.elements.sendButton.addEventListener(
        'mousedown',
        this.createRippleEffect
      );

      // Close button functionality
      const closeButton = document.querySelector('.header-close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          this.elements.panel.classList.remove('open');
        });
      }
    },

    createRippleEffect(e) {
      const button = e.currentTarget;
      const ripple = document.createElement('div');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255,255,255,0.7);
        border-radius: 50%;
        transform: translate(${x}px, ${y}px) scale(0);
        animation: ripple 0.6s linear;
      `;

      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    },

    addMessage(type, content) {
      const message = DOM.create('div', null, `widget-message ${type}`);

      // Typing effect for bot messages
      if (type === 'bot') {
        message.style.opacity = '0';
        let i = 0;
        const text = content;
        message.textContent = '';
        this.elements.messages.appendChild(message);

        const typeWriter = () => {
          if (i < text.length) {
            message.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 20);
          }
        };

        setTimeout(() => {
          message.style.opacity = '1';
          typeWriter();
        }, 200);
      } else {
        message.textContent = content;
        this.elements.messages.appendChild(message);
      }

      this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    },

    showLoading() {
      const loading = DOM.create(
        'div',
        'widget-loading-indicator',
        'widget-loading'
      );
      const spinner = DOM.create('div', null, 'widget-loading-spinner');

      loading.appendChild(spinner);
      loading.appendChild(document.createTextNode('Analyzing...'));

      this.elements.messages.appendChild(loading);
      this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    },

    hideLoading() {
      const loading = DOM.get('widget-loading-indicator');
      if (loading) {
        loading.remove();
      }
    },

    handleFileUpload(e) {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        this.addMessage('user', `Uploaded: ${file.name}`);

        // Simulate CV analysis
        this.showLoading();

        setTimeout(() => {
          this.hideLoading();

          const fileExtension = file.name.split('.').pop().toLowerCase();
          let analysis = '';

          if (
            fileExtension === 'pdf' ||
            fileExtension === 'docx' ||
            fileExtension === 'doc'
          ) {
            analysis = `I've analyzed your CV (${file.name}) and here are my findings:
            
1. Your CV appears to be in a standard format.
2. For better results, ensure you have clear sections for:
   - Professional experience
   - Education
   - Skills
   - Contact information
3. Is there anything specific you'd like me to help with regarding your CV?`;
          } else {
            analysis = `The file you uploaded (${file.name}) doesn't appear to be a standard CV format. Please upload a PDF or Word document.`;
          }

          this.addMessage('bot', analysis);
        }, 1500);
      }
    },

    sendMessage() {
      const message = this.elements.input.value.trim();

      if (message === '') return;

      this.addMessage('user', message);
      this.elements.input.value = '';
      this.elements.sendButton.disabled = true;

      // Simulate response
      this.showLoading();

      setTimeout(() => {
        this.hideLoading();

        let response = '';

        if (
          message.toLowerCase().includes('experience') ||
          message.toLowerCase().includes('work')
        ) {
          response =
            "When listing your work experience, use action verbs and quantify your achievements when possible. For example, instead of 'Responsible for managing team', write 'Led a team of 5 developers, increasing productivity by 20%'.";
        } else if (message.toLowerCase().includes('education')) {
          response =
            'For your education section, list your most recent degree first. Include the institution name, degree obtained, field of study, and graduation date. If you had outstanding achievements, like graduating with honors, include those too.';
        } else if (message.toLowerCase().includes('skill')) {
          response =
            "Organize your skills into categories (e.g., Technical Skills, Soft Skills, Languages). Tailor them to match the job description of positions you're applying for.";
        } else {
          response =
            "I'm here to help with your CV. You can ask me about optimizing different sections, formatting tips, or industry-specific advice.";
        }

        this.addMessage('bot', response);
      }, 1000);
    },
  };

  // Public API
  window.CVWidget = {
    init() {
      WidgetController.init();
    },

    updateTheme(newTheme) {
      WidgetState.updateTheme(newTheme);
    },

    // Additional public methods can be added here
    addMessage(type, content) {
      WidgetController.addMessage(type, content);
    },
  };

  // Auto-initialize the widget
  document.addEventListener('DOMContentLoaded', () => {
    window.CVWidget.init();
  });
})();
