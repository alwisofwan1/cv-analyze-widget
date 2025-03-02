// @ts-nocheck
(function () {
  // Create widget container
  function createWidget() {
    // Check if widget already exists to prevent duplicates
    if (document.getElementById('cv-analysis-widget-container')) {
      console.log('CV Analysis Widget already exists');
      return null;
    }

    // Create and append stylesheet
    const style = document.createElement('style');
    style.textContent = `
      #cv-analysis-widget-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      
      #cv-analysis-widget-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #3b82f6;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
      }
      
      #cv-analysis-widget-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
      
      #cv-analysis-widget-panel {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        display: none;
        flex-direction: column;
      }
      
      #cv-analysis-widget-panel.open {
        display: flex;
      }
      
      #cv-analysis-widget-header {
        background-color: #3b82f6;
        color: white;
        padding: 15px;
        font-weight: 500;
        display: flex;
        align-items: center;
      }
      
      #cv-analysis-widget-messages {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
        background-color: #f9fafb;
      }
      
      .widget-message {
        margin-bottom: 10px;
        max-width: 80%;
        padding: 10px 12px;
        border-radius: 12px;
        line-height: 1.4;
      }
      
      .widget-message.bot {
        background-color: #e5e7eb;
        color: #1f2937;
        border-bottom-left-radius: 0;
        align-self: flex-start;
      }
      
      .widget-message.user {
        background-color: #3b82f6;
        color: white;
        border-bottom-right-radius: 0;
        align-self: flex-end;
        margin-left: auto;
      }
      
      #cv-analysis-widget-input-area {
        padding: 10px;
        border-top: 1px solid #e5e7eb;
      }
      
      #cv-analysis-widget-file-upload {
        padding: 8px;
        margin-bottom: 10px;
        background-color: #f3f4f6;
        border: 1px dashed #d1d5db;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        color: #6b7280;
      }
      
      #cv-analysis-widget-file-upload:hover {
        background-color: #e5e7eb;
      }
      
      #cv-analysis-widget-input-container {
        display: flex;
      }
      
      #cv-analysis-widget-input {
        flex: 1;
        padding: 10px 12px;
        border: 1px solid #d1d5db;
        border-right: none;
        border-radius: 8px 0 0 8px;
        outline: none;
      }
      
      #cv-analysis-widget-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
      }
      
      #cv-analysis-widget-send {
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 0 8px 8px 0;
        padding: 0 15px;
        cursor: pointer;
      }
      
      #cv-analysis-widget-send:hover {
        background-color: #2563eb;
      }
      
      #cv-analysis-widget-send:disabled {
        background-color: #93c5fd;
        cursor: not-allowed;
      }
      
      .widget-loading {
        display: flex;
        align-items: center;
        padding: 10px 12px;
        background-color: #e5e7eb;
        color: #1f2937;
        border-radius: 12px;
        border-bottom-left-radius: 0;
        max-width: 80%;
        margin-bottom: 10px;
      }
      
      .widget-loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #9ca3af;
        border-top-color: #3b82f6;
        border-radius: 50%;
        margin-right: 8px;
        animation: widget-spin 1s linear infinite;
      }
      
      @keyframes widget-spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    // Create widget container
    const container = document.createElement('div');
    container.id = 'cv-analysis-widget-container';

    // Create toggle button
    const button = document.createElement('div');
    button.id = 'cv-analysis-widget-button';
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';

    // Create panel
    const panel = document.createElement('div');
    panel.id = 'cv-analysis-widget-panel';

    // Create header
    const header = document.createElement('div');
    header.id = 'cv-analysis-widget-header';
    header.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> CV Analysis Assistant';

    // Create messages container
    const messages = document.createElement('div');
    messages.id = 'cv-analysis-widget-messages';

    // Create input area
    const inputArea = document.createElement('div');
    inputArea.id = 'cv-analysis-widget-input-area';

    // Create file upload
    const fileUpload = document.createElement('div');
    fileUpload.id = 'cv-analysis-widget-file-upload';
    fileUpload.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 5px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> Upload your CV (PDF/Word)';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx';
    fileInput.style.display = 'none';

    // Create input container
    const inputContainer = document.createElement('div');
    inputContainer.id = 'cv-analysis-widget-input-container';

    const input = document.createElement('input');
    input.id = 'cv-analysis-widget-input';
    input.type = 'text';
    input.placeholder = 'Ask a question about your CV...';

    const sendButton = document.createElement('button');
    sendButton.id = 'cv-analysis-widget-send';
    sendButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
    sendButton.disabled = true;

    // Assemble the widget
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);

    inputArea.appendChild(fileUpload);
    inputArea.appendChild(fileInput);
    inputArea.appendChild(inputContainer);

    panel.appendChild(header);
    panel.appendChild(messages);
    panel.appendChild(inputArea);

    container.appendChild(button);
    container.appendChild(panel);

    document.body.appendChild(container);

    // Add initial message
    addMessage('bot', 'Hello! Upload your CV and I can analyze it for you.');

    // Add event listeners
    button.addEventListener('click', togglePanel);
    fileUpload.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    input.addEventListener('input', () => {
      sendButton.disabled = input.value.trim() === '';
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim() !== '') {
        sendMessage();
      }
    });
    sendButton.addEventListener('click', sendMessage);

    return container;
  }

  function togglePanel() {
    const panel = document.getElementById('cv-analysis-widget-panel');
    panel.classList.toggle('open');
  }

  function addMessage(type, content) {
    const messages = document.getElementById('cv-analysis-widget-messages');
    const message = document.createElement('div');
    message.className = `widget-message ${type}`;
    message.textContent = content;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function showLoading() {
    const messages = document.getElementById('cv-analysis-widget-messages');
    const loading = document.createElement('div');
    loading.className = 'widget-loading';
    loading.id = 'widget-loading-indicator';

    const spinner = document.createElement('div');
    spinner.className = 'widget-loading-spinner';

    loading.appendChild(spinner);
    loading.appendChild(document.createTextNode('Analyzing...'));

    messages.appendChild(loading);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideLoading() {
    const loading = document.getElementById('widget-loading-indicator');
    if (loading) {
      loading.remove();
    }
  }

  function handleFileUpload(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      addMessage('user', `Uploaded: ${file.name}`);

      // Simulate CV analysis
      showLoading();

      setTimeout(() => {
        hideLoading();

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

        addMessage('bot', analysis);
      }, 1500);
    }
  }

  function sendMessage() {
    const input = document.getElementById('cv-analysis-widget-input');
    const message = input.value.trim();

    if (message === '') return;

    addMessage('user', message);
    input.value = '';
    document.getElementById('cv-analysis-widget-send').disabled = true;

    // Simulate response
    showLoading();

    setTimeout(() => {
      hideLoading();

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

      addMessage('bot', response);
    }, 1000);
  }

  // Initialize the widget
  const targetElement = document.getElementById('cv-analysis-widget');
  if (targetElement) {
    // If there's a target element, insert the widget there
    const widget = createWidget();
    if (widget) {
      targetElement.appendChild(widget);
      document.getElementById('cv-analysis-widget-panel').classList.add('open');

      // Adjust styles for embedded mode
      const container = document.getElementById('cv-analysis-widget-container');
      container.style.position = 'relative';
      container.style.bottom = 'auto';
      container.style.right = 'auto';

      const button = document.getElementById('cv-analysis-widget-button');
      button.style.display = 'none';

      const panel = document.getElementById('cv-analysis-widget-panel');
      panel.style.position = 'relative';
      panel.style.bottom = 'auto';
      panel.style.right = 'auto';
      panel.style.width = '100%';
      panel.style.height = '100%';
    }
  } else {
    // Otherwise, create the floating widget
    createWidget();
  }
})();
