const size = {
    tyOne : "1920px",
    tyTwo : "1600px",
    tyThree : "1280px"
};

const theme = {
    w1920: `(max-width: ${size.mobile})`,
    w1600: `(max-width: ${size.tyTwo})`,
    w1280: `(max-width: ${size.tyThree})`
};

export default theme;