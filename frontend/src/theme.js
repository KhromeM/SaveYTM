import { extendTheme, theme } from '@chakra-ui/react';
import '@fontsource/roboto';

let myTheme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: 'black',
      },
    }),
  },
  fonts: {
    heading: `roboto, sans-serif`,
    body: `roboto,sans-serif`,
  },
  colors: {
    youtube: {
      gray: '#212121',
    },
  },
  components: {
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: 'red',
        },
      },
    },
  },
});

export default myTheme;
