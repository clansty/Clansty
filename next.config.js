module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        DOMESTIC: process.env.BUILD_FOR_DOMESTIC,
    },
    async redirects() {
        return [
            {
                source: '/favicon.ico',
                destination: '/favicon.webp',
                permanent: true,
            },
        ]
    },
}
