import React from 'react';
import { Routing } from './components';
import { AuthContextProvider} from './contexts/AuthContext';
import GlobalStyle from './globalStyles';
import { RequestContextProvider } from './contexts';

function App() {
  
  return (
    <React.StrictMode>
      <RequestContextProvider>
        <AuthContextProvider>
          <>
            <GlobalStyle/>
            <Routing/>
          </>
        </AuthContextProvider>
      </RequestContextProvider>
    </React.StrictMode>
  );
}

export default App;
