/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'] ,
    images:{
      domains:['res.cloudinary.com']
    }
   /*  experimental: {
        esmExternals: "loose", 
        serverComponentsExternalPackages: ["mongoose"] 
      },
     
      webpack: (config) => {
        config.experiments = {
          topLevelAwait: true
        };
        return config;
      }, */
}

module.exports = nextConfig
