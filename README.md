# Personal MDX Blog

A modern, React-based personal blog that supports MDX for writing interactive blog posts with embedded React components. Built with Next.js and deployed to GitHub Pages.

## Features

- **MDX Support**: Write blog posts in Markdown and embed React components directly in your content
- **React Components**: Include interactive components like quizzes in your blog posts
- **SEO Optimization**: Meta tags for better search engine visibility
- **Responsive Design**: Looks great on all devices
- **Static Site Generation**: Fast loading times and easy deployment
- **GitHub Actions**: Automated testing, building, and deployment

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/personal-mdx-blog.git
cd personal-mdx-blog
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the blog.

## Project Structure

```
personal-mdx-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow for CI/CD
├── components/
│   ├── Quiz.tsx            # Example interactive component
│   └── Quiz.test.tsx       # Tests for the Quiz component
├── layouts/
│   └── Layout.tsx          # Main layout component
├── pages/
│   ├── _app.tsx            # Custom App component
│   ├── index.tsx           # Home page (blog post list)
│   ├── about.tsx           # About page
│   └── posts/
│       └── [slug].tsx      # Dynamic route for blog posts
├── posts/
│   ├── getting-started-with-mdx.mdx  # Sample blog post
│   └── react-hooks-explained.mdx     # Another sample blog post
├── styles/
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── jest.config.js          # Jest configuration
├── jest.setup.js           # Jest setup
├── tsconfig.json           # TypeScript configuration
├── .eslintrc.json          # ESLint configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Writing Blog Posts

Blog posts are written in MDX format and stored in the `posts` directory. Each post should include frontmatter at the top with metadata:

```mdx
---
title: 'My Blog Post Title'
date: '2023-08-15'
description: 'A brief description of the post for SEO and previews.'
tags: ['tag1', 'tag2']
---

# Content starts here

Regular markdown content...

<Quiz 
  question="An embedded React component!"
  options={[
    { id: '1', text: 'Option 1', isCorrect: false },
    { id: '2', text: 'Option 2', isCorrect: true }
  ]}
  explanation="Explanation of the answer."
/>

More markdown content...
```

### Adding Custom Components

1. Create your component in the `components` directory
2. Import and add it to the components object in `pages/_app.tsx`
3. Use it directly in your MDX files

## Deployment

This project is set up to automatically deploy to GitHub Pages using GitHub Actions.

### Setup

1. Push your code to a GitHub repository
2. Go to your repository settings and ensure GitHub Pages is enabled
3. The GitHub Actions workflow will automatically build and deploy your site when you push to the main branch

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
# or
yarn build
```

This will generate a static export in the `out` directory, which you can deploy to any static hosting service.

## Customization

- **Styling**: Modify `styles/globals.css` and `tailwind.config.js` to customize the look and feel
- **Layout**: Edit `layouts/Layout.tsx` to change the page structure
- **Components**: Add new components to the `components` directory

## Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js
- MDX
- React
- Tailwind CSS
- GitHub Actions 