import React, { ReactNode } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  children?: ReactNode;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  // Extract the language from the className (format: "language-jsx")
  const language = className ? className.replace(/language-/, '') : 'text';
  
  // Convert children to string (it might be a ReactNode)
  const content = children?.toString() || '';
  
  return (
    <Highlight
      theme={themes.vsDark}
      code={content.trim()}
      language={language as any}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '1rem', borderRadius: '0.5rem', overflow: 'auto' }}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line });
            return (
              <div key={i} {...lineProps}>
                <span className="line-number" style={{ display: 'inline-block', width: '2em', userSelect: 'none', opacity: 0.5 }}>
                  {i + 1}
                </span>
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token });
                  return <span key={key} {...tokenProps} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}; 