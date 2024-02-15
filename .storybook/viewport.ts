/* eslint-disable sort-keys,sort-keys-fix/sort-keys-fix */
const viewport = {
  viewports: {
    mobileSmall: {
      name: 'Small mobile',
      right: '',
      styles: {
        height: '667px',
        width: '375px',
      },
      type: 'mobile',
    },
    mobileLarge: {
      name: 'Large mobile',
      right: 'sm',
      styles: {
        height: '846px',
        width: '412px',
      },
      type: 'mobile',
    },
    portrait: {
      name: 'Portrait',
      right: 'md',
      styles: {
        height: '1024px',
        width: '768px',
      },
      type: 'tablet',
    },
    landscape: {
      name: 'Landscape',
      right: 'lg',
      styles: {
        height: '768px',
        width: '1024px',
      },
      type: 'tablet',
    },
  },
};

export default viewport;
