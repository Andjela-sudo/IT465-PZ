import React from 'react'
import Grid from '@mui/material/Grid';
import { Button, ButtonGroup, TextField } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const FormText = (props) => {
    const onDownloadKey = () => {
        let slicedKey = ''
        if (props.state.message.length > 0) {
            slicedKey = props.state.key.slice(0, props.state.message.length)
        } else {
            slicedKey = props.state.key
        }

        const link = document.createElement("a");
        link.download = `key.txt`;
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(slicedKey);
        link.click();
    };

    const onUploadKey = (event) => {
        const fileList = event.target.files;
        let file = fileList[0]

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            // this will then display a text file
            console.log(reader.result);
            props.dispatch({ type: "set_key", payload:reader.result })
            
        }, false);

        if (file) {
            reader.readAsText(file);
        }

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Message"
                    placeholder={'Enter message'}
                    variant="outlined"
                    value={props.state.message}
                    onChange={(e) => { props.dispatch({ type: "set_message", payload: e.target.value }) }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Encryption/Decryption"
                    placeholder={'Message'}
                    variant="outlined"
                    value={props.state.answer}
                />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
                <ButtonGroup variant="text" >
                    <Button onClick={props.encryptTextMessage}>ENCRYPT</Button>
                    <Button onClick={props.decryptTextMessage}>DECRYPT</Button>
                </ButtonGroup>
                <ButtonGroup variant="text" >
                    <Button onClick={onDownloadKey}>Download key <DownloadIcon /> </Button>
                    <Button component="label">
                        Upload key
                        <input
                            onChange={onUploadKey}
                            type="file"
                            hidden
                        /><FileUploadIcon />
                    </Button>
                </ButtonGroup>

            </Grid>
        </Grid>
    )
}

export default FormText