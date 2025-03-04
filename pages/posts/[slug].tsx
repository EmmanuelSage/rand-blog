import { GetStaticProps, GetStaticPaths } from 'next';
import { Helmet } from 'react-helmet';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { format } from 'date-fns';
import Layout from '@/layouts/Layout';
import { Quiz } from '@/components/Quiz';
import { CodeBlock } from '@/components/CodeBlock';

// Custom components available in MDX
const components = {
  Quiz,
  pre: (props: any) => <div {...props} />,
  code: CodeBlock,
  // Add other custom components here
};

interface PostPageProps {
  frontMatter: {
    title: string;
    date: string;
    description: string;
    tags?: string[];
    [key: string]: any;
  };
  slug: string;
  mdxSource: MDXRemoteSerializeResult;
}

export default function PostPage({ frontMatter, slug, mdxSource }: PostPageProps) {
  return (
    <Layout>
      <Helmet>
        <title>{frontMatter.title} | My Personal Blog</title>
        <meta name="description" content={frontMatter.description} />
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yourblog.com/posts/${slug}`} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.description} />
      </Helmet>
      
      <article className="container py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{frontMatter.title}</h1>
          <time className="text-gray-500 block mb-4">
            {format(new Date(frontMatter.date), 'MMMM d, yyyy')}
          </time>
          
          {frontMatter.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {frontMatter.tags.map((tag: string) => (
                <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-xl text-gray-700">{frontMatter.description}</p>
        </header>
        
        <div className="prose">
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all the posts
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  // Get the slugs from the filenames
  const paths = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => ({
      params: {
        slug: filename.replace(/\.mdx$/, ''),
      },
    }));
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Parse the front matter and content
  const { data, content } = matter(fileContents);
  
  // Dynamically import remark-gfm
  const remarkGfm = await import('remark-gfm');
  
  // Serialize the MDX content
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm.default],
      rehypePlugins: [],
    },
    scope: data,
  });
  
  return {
    props: {
      frontMatter: data,
      slug,
      mdxSource,
    },
  };
}; 