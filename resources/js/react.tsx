import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div>
      <h1 className='title'>It Works!</h1>
      <p className='subtitle'>
        Congratulations, you have just created your first AdonisJS app.
      </p>
      <p className='subtitle'>This is rendered with React.</p>
    </div>
  );
}

const container = document.getElementById('app');

if (container !== null) {
  createRoot(container).render(<App />);
}
