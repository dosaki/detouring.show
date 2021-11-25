const pick = (...args) => {
    const nr = int(0, args.length - 1);
    return args[nr];
};

/**
 * Generate a random Integer.
 * @param { integer } min Minimum Integer in the range (inclusive)
 * @param { integer } max Maximum Integer in the range (inclusive)
 * @returns { integer }
 */
const int = (min, max) => {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
};

const randomUtils = {pick, int};

export default randomUtils;