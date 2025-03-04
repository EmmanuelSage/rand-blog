const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
} else {
  // For local development, use the default values
  assetPrefix = '/rand-blog/';
  basePath = '/rand-blog';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  // Set the base path for GitHub Pages deployment
  // The basePath should match your repository name
  basePath: basePath,
  assetPrefix: assetPrefix,
  // Add a custom webpack config to handle the .nojekyll file
  webpack: (config, { isServer }) => {
    // Only run this on the client-side build
    if (!isServer) {
      // Create .nojekyll file to prevent GitHub Pages from using Jekyll
      require('fs').writeFileSync('./out/.nojekyll', '');
    }
    return config;
  },
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig); 