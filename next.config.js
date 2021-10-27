module.exports = {
    reactStrictMode: false,
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
