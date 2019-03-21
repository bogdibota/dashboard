export default theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    flex: 1,
    marginTop: 2 * theme.spacing.unit,
    minHeight: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  tabContainer: {
    padding: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
  },
});
