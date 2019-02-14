export default theme => ({
    item: {
        flexBasis: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        flexBasis: '100%',
        textAlign: 'left',
        padding: `0 ${theme.spacing.unit}px`,
    },
    commandLabel: {
        flex: 1,
    },
});
