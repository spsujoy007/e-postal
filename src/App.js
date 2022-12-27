import { RouterProvider } from 'react-router-dom';
import './App.css';
import { routes } from './Routes/Routes';

function App() {
  return (
    <div className="App" data-theme='epostalTheme'>
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
