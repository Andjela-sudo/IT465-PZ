import { createTheme, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import { useReducer } from 'react';
import TabsDivider from './components/TabsDivider';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'set_key': return { ...state, key: action.payload }
      case 'set_should_track_mouse': return { ...state, shouldTrackMouse: action.payload }
      case 'set_message': return { ...state, message: action.payload }
      default: return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    key: '',
    shouldTrackMouse: true,
    message: '',
  });


  // useEffect(()=>{},[key])

  const encryptTextMessage = () => {
    dispatch({ type: "set_should_track_mouse", payload: false });
    dispatch({ type: "set_key", payload: state.key.slice(0, state.message.length) });

    // enkriptovanje poruke
    // stringEncryption(message, key)

    //cuvanje key u dokument
  }

  const handleMouseMove = (event) => {
    dispatch({ type: "set_key", payload: state.key + (event.clientX + event.clientY) });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Stack
          sx={{
            direction: 'column',
            justifyContent: 'center',
            height: '100vh',
          }}
          onMouseMove={state.shouldTrackMouse ? handleMouseMove : undefined} maxWidth="sm">
          <TabsDivider
            state={state}
            dispatch={dispatch}
            encryptTextMessage={encryptTextMessage} />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
