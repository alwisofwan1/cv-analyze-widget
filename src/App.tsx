import { ChatbotWidget, ChatbotProvider } from './components/chatbot';

function App() {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>
          FAQ Chatbot Demo
        </h1>
        <p className='text-gray-600 mb-4'>
          This is a demonstration of an interactive FAQ chatbot widget that
          guides users through a structured conversation flow.
        </p>
        <p className='text-gray-600 mb-4'>
          The chatbot supports both Indonesian and English languages and
          provides information about certification programs, schedules, and
          more.
        </p>
        <p className='text-gray-700 font-medium'>
          Click the chat icon in the bottom right corner to start the
          conversation.
        </p>
      </div>

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
    </div>
  );
}

export default App;
