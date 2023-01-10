import { createTheme, CssBaseline, Stack, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useReducer } from 'react';
import TabsDivider from './components/TabsDivider';
import { stringEncryption, stringEncryptionDecription } from './vernam_cipher';

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
      case 'set_answer': return { ...state, answer: action.payload }
      case 'set_file_key': return { ...state, fileKey: action.payload }
      case 'set_file': return {...state, file: action.payload}
      case 'set_download_file': return {...state, download_file: action.payload}
      default: return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    key: '',
    shouldTrackMouse: true,
    message: '',
    answer: '',
    fileKey: '',
    file: '',
    download_file: true,
  });

  const encryptTextMessage = () => {
    dispatch({ type: "set_should_track_mouse", payload: false });
    dispatch({
      type: "set_key",
      payload: state.key.slice(0, state.message.length),
    })

    let result = stringEncryptionDecription(state.message, state.key)
    dispatch({ type: "set_answer", payload: result });
    console.log(result);
  }

  const decryptTextMessage = () => {
    let result = stringEncryptionDecription(state.message, state.key)
    dispatch({ type: "set_answer", payload: result });

  }


  const encryptFile = () => {
    dispatch({ type: "set_should_track_mouse", payload: false });
    dispatch({
      type: "set_key",
      payload: state.key.slice(0, state.file.length),
    })

    console.log(state.file);
    let result = stringEncryptionDecription(state.file.toString(), state.key)
    dispatch({ type: "set_file", payload: result });
    console.log(result);
  }

  const decryptFile = () => {
    let result = stringEncryptionDecription(state.file, state.key)
    dispatch({ type: "set_file", payload: result });
  }


  const handleMouseMove = (event) => {
    let charCode = ''
    if (event.clientX == 0) {
      charCode = event.clientY
    }
    else if (event.clientY == 0) {
      charCode = event.clientX
    } else {
      charCode = (event.clientX + event.clientY)
    }

    dispatch({ type: "set_key", payload: state.key + String.fromCharCode(charCode) });
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
            encryptTextMessage={encryptTextMessage}
            decryptTextMessage={decryptTextMessage}
            encryptFile={encryptFile}
            decryptFile={decryptFile}        
           />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
