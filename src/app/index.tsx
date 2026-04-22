import ReactDOM from 'react-dom/client';
import { Providers } from '@/app/Providers';
import { MainPage } from '@/pages';

function App() {
  return (
    <Providers>
      <MainPage />
    </Providers>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
