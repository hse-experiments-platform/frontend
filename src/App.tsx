import { StrictMode } from 'react';
import { Routing } from './components';
import { AuthContextProvider} from './contexts/AuthContext';
import GlobalStyle from './globalStyles';
import { RequestContextProvider } from './contexts';

function App() {
  
  return (
    <StrictMode>
      <RequestContextProvider>
        <AuthContextProvider>
          <div>
            <GlobalStyle/>
            <Routing/>
          </div>
        </AuthContextProvider>
      </RequestContextProvider>
    </StrictMode>
  );
}

export default App;
