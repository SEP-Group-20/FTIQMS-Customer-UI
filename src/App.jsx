import { Router } from './routes/router';
import { AuthProvider } from './utils/auth';


function App() {
  return (
    <div>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </div>
  );
}

export default App;
