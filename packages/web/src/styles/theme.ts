// import { Theme } from 'theme-ui';
import { polaris } from '@theme-ui/presets';

// Polaris colors
// colors: {
//   text: '#454f5b',
//   background: '#fff',
//   primary: '#5c6ac4',
//   secondary: '#006fbb',
//   highlight: '#47c1bf',
//   muted: '#e6e6e6',
//   gray: '#dfe3e8',
//   accent: '#f49342',
//   darken: '#00044c',
//   modes: {
//     dark: {
//       text: '#3e4155',
//       background: '#000639',
//       primary: '#9c6ade',
//       secondary: '#b4e1fa',
//       highlight: '#b7ecec',
//       muted: '#e6e6e6',
//     },
//   },
// },

const theme = {
  ...polaris,
  styles: {
    ...polaris.styles,
  },
  sizes: {
    aside: '150px',
    linkAside: '100%',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  container: {
    maxWidth: 750,
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    header: {
      color: 'gray',
      bg: 'primary',
    },
    aside: {
      bg: 'primary',
      width: 'aside',
      nav: {
        display: 'flex',
        flexDirection: 'column',
        mt: 5,
      },
      link: {
        color: 'accent',
        textDecoration: 'none',
        display: 'inline-block',
        width: 'linkAside',
        px: 4,
      },
    },
    main: {
      flex: '1 1 auto',
      position: 'relative',
    },
    page: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    footer: {
      bg: 'darken',
      color: 'gray',
    },
  },
  alerts: {
    formError: {
      color: 'red',
      bg: 'background',
      border: 'solid 1px red',
      display: 'flex',
      flexDirection: 'column',
    },
  },
};

export default theme;
