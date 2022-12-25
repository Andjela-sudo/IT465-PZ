import React from 'react'
import Grid from '@mui/material/Grid';
import { Button, ButtonGroup, TextField } from '@mui/material';

const FormText = (props) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Message"
                    placeholder={'Enter message'}
                    variant="outlined"
                    onChange={(e) => { props.dispatch({ type: "set_message", payload: e.target.value }) }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Encryption/Decryption"
                    placeholder={'Message'}
                    variant="outlined" />
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={props.encryptTextMessage}>ENCRYPT</Button>
                    <Button>DECRYPT</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default FormText