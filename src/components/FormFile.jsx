import { Button, ButtonGroup, Grid } from '@mui/material'
import React from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const FormFile = (props) => {

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

    const onDownload = () => {
        const link = document.createElement("a");
        link.download = `download.txt`;
        link.href = "./download.txt";
        link.click();
    };

    const onUploadFile = (event) => {

        const fileList = event.target.files;
        let file = fileList[0]

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            // this will then display a text file
            console.log(reader.result);
            props.dispatch({ type: "set_file", payload:reader.result })
            
        }, false);

        if (file) {
            reader.readAsText(file);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        onChange={onUploadFile}
                        type="file"
                        hidden
                    />
                </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
                <ButtonGroup variant="text">
                    <Button onClick={props.encryptFile}>ENCRYPT</Button>
                    <Button onClick={props.decryptFile}>DECRYPT</Button>
                </ButtonGroup>
                <ButtonGroup variant="text" aria-label="text button group">
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
            <Grid item xs={12}>
                <Button onClick={onDownload} variant="contained" color="primary" disabled={true}>
                    Download file
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormFile