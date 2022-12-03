module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 100,
            unitPrecision: 5,
            mediaQuery: false,
            minPixelValue: 0,
            propList: ['*'],
            // exclude: /node_modules/i
            // exclude: /(node_module)|(m)/i
            exclude(filePath) {
                let includeReg = /pages\/.*\/c\//;
                console.log('11', filePath, !includeReg.test(filePath));
                return !includeReg.test(filePath);
            }
        }
    }
};
