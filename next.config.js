/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            stream: require.resolve("stream-browserify"),
            zlib: require.resolve("browserify-zlib"),
        };
        return config;
    },
};

module.exports = nextConfig;


