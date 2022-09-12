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
  fonts: {
    heading: `'Noto Sans', sans-serif`,
    body: `'Noto Sans', sans-serif`,
  },
  colors: {
    youtube: {
      gray: '#212121',
    },
  },
});

export default myTheme;
