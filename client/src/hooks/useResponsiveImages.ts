import { useState, useEffect } from 'react';

const useResponsiveImages = <T>(
  content: {
    sm: T;
    md: T;
    lg: T;
  },
  breakpoints = {
    sm: 640,
    md: 1024
  }
) => {
  const [currentContent, setCurrentContent] = useState<T>(content.lg);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < breakpoints.sm) {
        setCurrentContent(content.sm);
      } else if (width < breakpoints.md) {
        setCurrentContent(content.md);
      } else {
        setCurrentContent(content.lg);
      }
    };

    // Initial set
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [content, breakpoints]);

  return currentContent;
};

export { useResponsiveImages };
