export default {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '5vh',
        "& a": {
            textDecoration: 'none',
            color: 'inherit',
        }

    },
    logo: {
        fontSize: 18,
        padding: 10,
        marginRight: 20,
        background: '#eeeeee',
        fontWeight: 500,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'roboto',
    },
    level: {
        fontWeight: 400,
    },
    slider: {
        width: 300,
        margin: '0 15px',
        display: 'inline-block',
        "& .rc-slider-track": {
            background: "transparent"
        },
        "& .rc-slider-handle, .rc-slider-handle:focus, .rc-slider-handle:active, .rc-slider-handle:hover": {
            background: 'green',
            outline: 'none',
            border: '2px solid green',
            boxShadow: 'none',
        },
        "& .rc-slider-rail": {
            height: 8
        }
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: 10,
    }

}