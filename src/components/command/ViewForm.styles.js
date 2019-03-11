export default theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    flex: 1,
    marginTop: 2 * theme.spacing.unit,
  },
  tabContainer: {
    padding: theme.spacing.unit,
  },
});
