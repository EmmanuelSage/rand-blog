import { Helmet } from 'react-helmet';
import Layout from '@/layouts/Layout';

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About | My Personal Blog</title>
        <meta name="description" content="Learn more about me and my personal blog." />
      </Helmet>
      
      <div className="container py-10">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        
        <div className="prose">
          <p>
            Welcome to my personal blog! I'm a passionate developer who loves to share knowledge and experiences
            through writing. This blog is built with Next.js and MDX, allowing me to write content in Markdown
            while also embedding custom React components when needed.
          </p>
          
          <h2>About This Blog</h2>
          <p>
            This blog is built using:
          </p>
          <ul>
            <li>Next.js for the React framework</li>
            <li>MDX for writing content with embedded components</li>
            <li>Tailwind CSS for styling</li>
            <li>TypeScript for type safety</li>
            <li>GitHub Actions for CI/CD</li>
            <li>GitHub Pages for hosting</li>
          </ul>
          
          <h2>Contact</h2>
          <p>
            Feel free to reach out to me on social media or via email if you have any questions or just want to chat!
          </p>
        </div>
      </div>
    </Layout>
  );
} 