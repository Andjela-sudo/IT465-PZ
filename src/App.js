import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import TabsDivider from './components/TabsDivider';

function App() {

  const [key, setKey] = useState('')
  const [shouldTrackMouse, setShouldTrackMouse] = useState(true)
  const [message , setMessage] = useState('')


  const encryptTextMessage = () => {
        setShouldTrackMouse(false)
        setKey(key.slice(0, message.length)) 

        // enkriptovanje poruke

        //cuvanje key u dokument
  }



  const handleMouseMove = (event) => {
    setKey(key + (event.clientX + event.clientY))
  }

  return (
    <Container onMouseMove={shouldTrackMouse && handleMouseMove} maxWidth="sm">
      <TabsDivider message={message} setMessage={setMessage} encryptTextMessage={encryptTextMessage}/>
    </Container>
  );
}

export default App;
