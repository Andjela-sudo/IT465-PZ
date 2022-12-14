import { Button, ButtonGroup, Grid } from '@mui/material'
import React from 'react'

const FormFile = () => {

    const onDownload = () => {
        const link = document.createElement("a");
        link.download = `download.txt`;
        link.href = "./download.txt";
        link.click();
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
                        type="file"
                        hidden
                    />
                </Button>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button>ENCRYPT</Button>
                    <Button>DECRYPT</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={onDownload} variant="contained" color="primary" disabled={true}>
                    Download
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormFile