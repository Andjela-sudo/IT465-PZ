import { Alert, Container, LinearProgress, Stack } from '@mui/material'
import React from 'react'
import { useEffect, useReducer } from 'react';
import TabsDivider from './components/TabsDivider';
import { stringEncryption, stringEncryptionDecription } from './vernam_cipher';
import { service } from './services/service';

const Home = () => {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'set_key': return { ...state, key: action.payload }
      case 'set_should_track_mouse': return { ...state, shouldTrackMouse: action.payload }
      case 'set_message': return { ...state, message: action.payload }
      case 'set_answer': return { ...state, answer: action.payload }
      case 'set_file_key': return { ...state, fileKey: action.payload }
      case 'set_file': return { ...state, file: action.payload }
      case 'set_download_file': return { ...state, download_file: action.payload }
      case 'set_progress': return { ...state, progress: action.payload }
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
    progress : 0,
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


    // let result = stringEncryptionDecription(state.file.toString(), state.key)
    const formData = new FormData();
    formData.append('file', state.file)
    let keyB = new Blob([state.key], { type: 'text/plain' })
    formData.append('key', keyB, 'key.txt');
    if (keyB.length < state.file.length) {
      console.log("prekratak kljuc")
      Alert.apply("prekratak kljuc")
    } else {
      service.postFile(formData).then(response => {
        console.log(response.data);

        // Convert the base64-encoded data to binary data
        const binaryData = atob(response.data.data);

        // Create an ArrayBuffer from the binary data
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob object from the ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
        //const file = new File([blob], response.data?.name, { type: response.data.ext });
        // Generate a URL for the Blob object
        //const downloadUrl = URL.createObjectURL(blob);
        dispatch({ type: "set_file", payload: blob });

      })
    }

  }

  const decryptFile = () => {
    //let result = stringEncryptionDecription(state.file, state.key)
    //dispatch({ type: "set_file", payload: result });
    const formData = new FormData();
    formData.append('file', state.file)
    let keyB = new Blob([state.key], { type: 'text/plain' })
    formData.append('key', keyB, 'key.txt');
    service.decryptFile(formData).then(response => {
      console.log(response.data);

      // Convert the base64-encoded data to binary data
      const binaryData = atob(response.data.data);

      // Create an ArrayBuffer from the binary data
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }

      // Create a Blob object from the ArrayBuffer
      const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
      //const file = new File([blob], response.data?.name, { type: response.data.ext });
      // Generate a URL for the Blob object
      //const downloadUrl = URL.createObjectURL(blob);
  
      dispatch({ type: "set_file", payload: blob });


    })
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
    let kb = new Blob([state.key], { type: 'text/plain' })
    const progress = Math.min((kb.size / state.file.size) * 100, 100);
    //const progress = (kb.size / state.file.size) * 100;
    console.log('progress: ',progress)
    dispatch({ type: "set_progress", payload: progress });
  }


  return (

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
          <LinearProgress
          variant="determinate"
          value={state.progress}
          sx={{ marginTop: '20px' }}
        />
      </Stack>
    </Container>
  )
}

export default Home