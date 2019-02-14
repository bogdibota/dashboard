export const loadApi = () => {
  switch (process.env.REACT_APP_TARGET) {
    case 'web':
      return import('./mock');
    default:
      return import('./electron');
  }
};
