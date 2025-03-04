import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import Layout from '@/layouts/Layout';

interface Post {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    description: string;
    tags?: string[];
    [key: string]: any;
  };
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <Helmet>
        <title>My Personal Blog</title>
        <meta name="description" content="Welcome to my personal blog where I share my thoughts and experiences." />
      </Helmet>
      
      <div className="container py-10">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        
        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white p-6 rounded-lg shadow-md">
              <Link href={`/posts/${post.slug}`} className="no-underline">
                <h2 className="text-2xl font-bold mb-2 text-blue-600 hover:text-blue-800">{post.frontMatter.title}</h2>
              </Link>
              <time className="text-sm text-gray-500 mb-3 block">
                {format(new Date(post.frontMatter.date), 'MMMM d, yyyy')}
              </time>
              <p className="text-gray-700 mb-4">{post.frontMatter.description}</p>
              
              {post.frontMatter.tags && (
                <div className="flex flex-wrap gap-2">
                  {post.frontMatter.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mt-4">
                <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:text-blue-800">
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Get files from the posts directory
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  // Get the posts data
  const posts = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      // Read the file
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // Parse the front matter
      const { data } = matter(fileContents);
      
      // Get the slug from the filename
      const slug = filename.replace(/\.mdx$/, '');
      
      // Return the data
      return {
        slug,
        frontMatter: data,
      };
    })
    // Sort posts by date in descending order
    .sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime());
  
  return {
    props: {
      posts,
    },
  };
}; 