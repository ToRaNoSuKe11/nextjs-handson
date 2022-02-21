import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { blue, purple, red, yellow, green}  from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary:red,

    secondary:yellow,
  },
});


export default theme;