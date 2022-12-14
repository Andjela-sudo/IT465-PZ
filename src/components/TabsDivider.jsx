import Tab from '@mui/material/Tab';
import { Box } from '@mui/system';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react'
import FormFile from './FormFile'
import FormText from './FormText'

const TabsDivider = (props) => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Text" value="1" />
                        <Tab label="File" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><FormText message = {props.message}  setMessage = {props.setMessage} encryptTextMessage={props.encryptTextMessage} /></TabPanel>
                <TabPanel value="2"><FormFile /></TabPanel>
            </TabContext>
        </Box>
    );
}

export default TabsDivider