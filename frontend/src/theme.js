import { extendTheme, theme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const myTheme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: 'black',
      },
    }),
  },
});

export default myTheme;
