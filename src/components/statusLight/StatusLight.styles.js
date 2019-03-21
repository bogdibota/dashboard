export default theme => ({
    container: {
      borderRadius: '50%',
      width: '10px',
      height: '10px',
      fontSize: '10px',
      display: 'inline-block',
    },
    defaultElement: {
      backgroundColor: 'grey',
    },
    running: {
      backgroundColor: 'green',
      animation: 'pulse 1s infinite',
    },
    success: {
      color: 'green',
    },
    failed: {
      color: 'red',
    },
    '@keyframes pulse': {
      '0%': {
        opacity: '1',
      },
      '50%': {
        opacity: '.1',
      },
      '100%': {
        opacity: '1',
      }
    }
  })
;
