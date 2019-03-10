export default theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  leftPanel: {
    backgroundColor: theme.palette.background.default,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
  },
});
