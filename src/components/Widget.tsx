import React, { useState } from 'react';
import { MessageSquare, Send, Upload, Loader2 } from 'lucide-react';

export const Widget = () => {
  const [messages, setMessages] = useState<
    Array<{ type: 'user' | 'bot'; content: string }>
  >([
    {
      type: 'bot',
      content: 'Hello! Upload your CV and I can analyze it for you.',
    },
  ]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Add message about the uploaded file
      setMessages((prev) => [
        ...prev,
        { type: 'user', content: `Uploaded: ${selectedFile.name}` },
      ]);

      // Simulate CV analysis
      analyzeCV(selectedFile);
    }
  };

  const analyzeCV = (file: File) => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
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

      setMessages((prev) => [...prev, { type: 'bot', content: analysis }]);
      setLoading(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    setMessages((prev) => [...prev, { type: 'user', content: input }]);

    // Simulate response
    setLoading(true);
    setTimeout(() => {
      let response = '';

      if (
        input.toLowerCase().includes('experience') ||
        input.toLowerCase().includes('work')
      ) {
        response =
          "When listing your work experience, use action verbs and quantify your achievements when possible. For example, instead of 'Responsible for managing team', write 'Led a team of 5 developers, increasing productivity by 20%'.";
      } else if (input.toLowerCase().includes('education')) {
        response =
          'For your education section, list your most recent degree first. Include the institution name, degree obtained, field of study, and graduation date. If you had outstanding achievements, like graduating with honors, include those too.';
      } else if (input.toLowerCase().includes('skill')) {
        response =
          "Organize your skills into categories (e.g., Technical Skills, Soft Skills, Languages). Tailor them to match the job description of positions you're applying for.";
      } else {
        response =
          "I'm here to help with your CV. You can ask me about optimizing different sections, formatting tips, or industry-specific advice.";
      }

      setMessages((prev) => [...prev, { type: 'bot', content: response }]);
      setLoading(false);
    }, 1000);

    setInput('');
  };

  return (
    <div className='border rounded-lg overflow-hidden flex flex-col h-[500px] bg-gray-50'>
      {/* Header */}
      <div className='bg-blue-600 text-white p-4 flex items-center'>
        <MessageSquare className='mr-2' size={20} />
        <h3 className='font-medium'>CV Analysis Assistant</h3>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className='whitespace-pre-line'>{message.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className='flex justify-start'>
            <div className='bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none flex items-center'>
              <Loader2 className='animate-spin mr-2' size={16} />
              Analyzing...
            </div>
          </div>
        )}
      </div>

      {/* File upload */}
      <div className='p-4 border-t'>
        <label className='flex items-center justify-center w-full p-2 bg-gray-100 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors'>
          <Upload size={18} className='mr-2 text-gray-600' />
          <span className='text-sm text-gray-600'>
            {file ? file.name : 'Upload your CV (PDF/Word)'}
          </span>
          <input
            type='file'
            className='hidden'
            accept='.pdf,.doc,.docx'
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Input */}
      <div className='p-4 border-t flex'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask a question about your CV...'
          className='flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || input.trim() === ''}
          className='bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed'
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
