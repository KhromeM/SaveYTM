import { extendTheme, theme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import '@fontsource/roboto';
import '@fontsource/noto-sans';
const myTheme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: 'black',
      },
    }),
  },
  fonts: {
    heading: `roboto,noto-sans, sans-serif`,
    body: `roboto,noto-sans, sans-serif`,
  },
  colors: {
    youtube: {
      gray: '#212121',
    },
  },
});

export default myTheme;
