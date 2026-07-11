import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within a RouterProvider');
  return context;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, className, children, onClick, ...props }) => {
  const { navigate } = useRouter();
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };
  
  return (
    <a href={to} onClick={handleLinkClick} className={className} {...props}>
      {children}
    </a>
  );
};
