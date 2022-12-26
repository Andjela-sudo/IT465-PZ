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
        <Box sx={(t) => {
            return {
                width: '100%',
                typography: 'body1',
                backgroundColor: t.palette.action.disabledBackground,
                borderRadius: '10px',
            }
        }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Text" value="1" />
                        <Tab label="File" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <FormText
                        message={props.state.message}
                        dispatch={props.dispatch}
                        state={props.state}
                        encryptTextMessage={props.encryptTextMessage}
                        decryptTextMessage={props.decryptTextMessage} />
                </TabPanel>
                <TabPanel value="2">
                    <FormFile
                        dispatch={props.dispatch}
                        state={props.state}
                        encryptTextMessage={props.encryptTextMessage}
                        decryptTextMessage={props.decryptTextMessage} />
                </TabPanel>
            </TabContext>
        </Box >
    );
}

export default TabsDivider