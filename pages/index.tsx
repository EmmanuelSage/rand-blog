import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import Layout from '@/layouts/Layout';
import { useState, useMemo, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 5;
  
  // Handle URL search query parameter
  useEffect(() => {
    if (router.isReady) {
      const { search } = router.query;
      if (search && typeof search === 'string') {
        setSearchQuery(search);
      }
    }
  }, [router.isReady, router.query]);
  
  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const { title, description, tags = [] } = post.frontMatter;
      return (
        title.toLowerCase().includes(lowerCaseQuery) ||
        description.toLowerCase().includes(lowerCaseQuery) ||
        tags.some((tag: string) => tag.toLowerCase().includes(lowerCaseQuery))
      );
    });
  }, [posts, searchQuery]);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Update URL with search query
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query.trim())}`, undefined, { shallow: true });
    } else {
      router.push('/', undefined, { shallow: true });
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>My Personal Blog</title>
        <meta name="description" content="Welcome to my personal blog where I share my thoughts and experiences." />
      </Helmet>
      
      <div className="container py-10">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-600">No posts found</h2>
            <p className="mt-2 text-gray-500">Try a different search term</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {currentPosts.map((post) => (
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
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center">
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === 1 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 mx-1 rounded ${
                        currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
        
        {searchQuery && filteredPosts.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} matching "{searchQuery}"
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Clear search
              </button>
            )}
          </div>
        )}
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