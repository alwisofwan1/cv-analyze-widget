import { FileText } from 'lucide-react';
import { Widget } from './components/Widget';

function App() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      <div className='max-w-4xl w-full space-y-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            CV Analysis Widget
          </h1>
          <p className='text-xl text-gray-600'>
            Embed this widget on your website to provide CV analysis to your
            users
          </p>
        </div>

        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-4 flex items-center'>
            <FileText className='mr-2' />
            Widget Demo (React Component)
          </h2>
          <Widget />
        </div>

        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-4'>How to Embed in React</h2>
          <p className='mb-4'>Option 1: Use the React component directly:</p>
          <div className='bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-6'>
            <code>{`import { Widget } from './components/Widget';\n\nfunction MyPage() {\n  return (\n    <div>\n      <h1>My Page</h1>\n      <Widget />\n    </div>\n  );\n}`}</code>
          </div>

          <p className='mb-4'>Option 2: Use the script loader component:</p>
          <div className='bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-6'>
            <code>{`import { CVWidgetLoader } from './components/CVWidgetLoader';\n\nfunction MyPage() {\n  return (\n    <div>\n      <h1>My Page</h1>\n      <div style={{ height: '500px' }}>\n        <CVWidgetLoader />\n      </div>\n    </div>\n  );\n}`}</code>
          </div>

          <p className='mb-4'>
            Option 3: Add the script tag directly to your HTML:
          </p>
          <div className='bg-gray-800 text-white p-4 rounded-md overflow-x-auto'>
            <code>{`<script src="${window.location.origin}/widget.js"></script>\n<div id="cv-analysis-widget"></div>`}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
