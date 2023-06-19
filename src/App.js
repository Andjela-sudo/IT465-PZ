import { createTheme, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from './LogInPage';
import Home from './Home';
import { isTokenExpired } from './services/service';


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {




  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
         
          <Route path="/*" element={
            localStorage.getItem("auth") ?
              <Home /> : <Navigate to="/login" />} />
        </Routes>
      </Router>

    </ThemeProvider>
  );
}

export default App;
