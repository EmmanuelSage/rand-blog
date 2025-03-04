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
  // For local development, use empty paths (root of the domain)
  assetPrefix = '';
  basePath = '';
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
  // The basePath should match your repository name for GitHub Pages
  // or be empty for local development
  basePath: basePath,
  assetPrefix: assetPrefix,
  
  // Add trailingSlash for better compatibility with static exports
  trailingSlash: true,
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig); 