/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'jglxmcybxtecnauhcazz.supabase.co',
          },
        ],
      },
};

module.exports = nextConfig;
