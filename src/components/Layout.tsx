import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Business', path: '/business' },
  { name: 'Company', path: '/company' },
  { name: 'Recruit / Contact', path: '/contact' },
];

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-brand-navy">
              PRESING <span className="text-brand-blue">HOLDINGS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-blue",
                  location.pathname === item.path ? "text-brand-blue" : "text-gray-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-navy">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-1"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-3 py-4 text-base font-medium rounded-md",
                location.pathname === item.path ? "bg-blue-50 text-brand-blue" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-brand-navy font-bold text-lg">P</span>
              </div>
              <span className="text-lg font-bold tracking-tighter">
                PRESING <span className="text-brand-blue">HOLDINGS</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              人と技術をつなぐ。多様な才能が、未来のシステムを創る。<br />
              就労移行支援を起点とした「教育〜雇用〜開発」の循環型ビジネスモデルで、持続可能な社会の実現に貢献します。
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Menu</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <p className="text-sm text-gray-400 mb-2">プレジング・ホールディングス株式会社</p>
            <p className="text-sm text-gray-400">〒000-0000 東京都〇〇区〇〇 0-0-0</p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Presing Holdings Co., Ltd. All rights reserved.
          </div>
          <Link to="/dashboard" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Admin Console
          </Link>
        </div>
      </div>
    </footer>
  );
};
