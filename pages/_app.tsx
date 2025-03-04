import { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import { Helmet } from 'react-helmet';
import '../styles/globals.css';

// Import custom MDX components
import { Quiz } from '@/components/Quiz';
import { CodeBlock } from '@/components/CodeBlock';

// MDX components that will be available in all MDX files
const components = {
  Quiz,
  // Add custom code block handling
  pre: (props: any) => <div {...props} />,
  code: CodeBlock,
  // Add other custom components here
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Default meta tags that can be overridden by individual pages */}
        <title>My Personal Blog</title>
        <meta name="description" content="A personal blog built with Next.js and MDX" />
      </Helmet>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  );
}

export default MyApp; 