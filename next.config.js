module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        DOMESTIC: process.env.BUILD_FOR_DOMESTIC,
    },
}
