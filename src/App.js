import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { routes } from './Routes/Routes';

function App() {
  return (
    <div className="App" data-theme='epostalTheme'>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster 
        position="top-center"
        reverseOrder={false}>
      </Toaster>
      
    </div>
  );
}

export default App;
