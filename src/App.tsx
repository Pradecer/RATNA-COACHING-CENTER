import React from 'react';
import { DataProvider } from './context/DataContext';
import { RouterProvider, useRouter } from './components/Router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

// Pages
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Courses } from './pages/Courses';
import { Subjects } from './pages/Subjects';
import { Facilities } from './pages/Facilities';
import { Admissions } from './pages/Admissions';
import { Results } from './pages/Results';
import { Gallery } from './pages/Gallery';
import { Testimonials } from './pages/Testimonials';
import { StudyResources } from './pages/StudyResources';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { ContactUs } from './pages/ContactUs';
import { AdminDashboard } from './pages/AdminDashboard';
import { StudentPortal } from './pages/StudentPortal';
import { AuthProvider } from './context/AuthContext';
import { LoginModal } from './components/LoginModal';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  const renderPage = () => {
    switch (path) {
      case '/':
        return <Home />;
      case '/about-us':
        return <AboutUs />;
      case '/courses':
        return <Courses />;
      case '/subjects':
        return <Subjects />;
      case '/facilities':
        return <Facilities />;
      case '/admissions':
        return <Admissions />;
      case '/results-achievements':
        return <Results />;
      case '/gallery':
        return <Gallery />;
      case '/testimonials':
        return <Testimonials />;
      case '/study-resources':
        return <StudyResources />;
      case '/blog':
        return <Blog />;
      case '/contact-us':
        return <ContactUs />;
      case '/admin':
        return <AdminDashboard />;
      case '/portal':
        return <StudentPortal />;
      default:
        // Handle parameterized dynamic paths (like /blog/:slug)
        if (path.startsWith('/blog/')) {
          return <BlogPost />;
        }
        
        // 404 Fallback page
        return (
          <div className="bg-slate-50 min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
            <h1 className="text-6xl font-extrabold text-primary mb-4 font-serif">404</h1>
            <h2 className="text-xl font-bold text-slate-700 mb-2">Page Not Found</h2>
            <p className="text-xs text-slate-500 font-semibold max-w-sm leading-relaxed mb-6">
              The link you followed may be broken or the page may have been removed by administrators.
            </p>
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new Event('popstate'));
              }}
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-light transition-all cursor-pointer"
            >
              Return to Home Page
            </a>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow">
          {renderPage()}
        </main>
      </div>
      <Footer />
      <FloatingActions />
      <LoginModal />
    </div>
  );
};

export function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
