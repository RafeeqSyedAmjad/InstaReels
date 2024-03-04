// import './App.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Context/AuthContext'
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    
      <AuthProvider>
        <AppRoutes/>
        <Toaster />
      </AuthProvider>
  );
}

export default App;