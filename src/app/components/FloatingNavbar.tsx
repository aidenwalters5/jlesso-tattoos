'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', pattern: 'diagonal-lines', href: '/' },
    { name: 'About', pattern: 'group-photo', href: '/about' },
    { name: 'Portfolio', pattern: 'work', href: '/projects' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Contact', href: '/contact' },
  ];

  const getCurrentPageName = () => {
    const currentItem = menuItems.find((item) => item.href === pathname);
    return currentItem ? currentItem.name : 'Home';
  };

  const getThumbnail = (pattern: string) => {
    const iconWrapper =
      'w-full h-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors';
    const svgProps = 'w-6 h-6 text-white';
    const icons: Record<string, React.JSX.Element> = {
      'diagonal-lines': (
        <div className={iconWrapper}>
          <svg className={svgProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
      ),
      'group-photo': (
        <div className={iconWrapper}>
          <svg className={svgProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      ),
      work: (
        <div className={iconWrapper}>
          <svg className={svgProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
      ),
    };
    return icons[pattern];
  };

  return (
    <>
      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded-navbar"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ originY: 1 }}
            className="fixed bottom-6 md:bottom-8 left-1/2 z-40 -translate-x-1/2 bg-gradient-to-b from-black/95 to-neutral-950/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_10px_60px_-10px_rgba(0,0,0,0.8)] w-[90vw] md:w-[500px] lg:w-[550px] overflow-hidden"
          >
            <div className="relative p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-10 blur-2xl -z-10 animate-pulse" />

              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={() => setIsExpanded(false)} className="flex items-center gap-3 group">
                  <span className="text-white font-light tracking-wide text-lg opacity-90 group-hover:opacity-100 transition-opacity">
                    JLesso
                  </span>
                </Link>
                <Link href="/contact" onClick={() => setIsExpanded(false)}>
                  <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors">
                    Book Session
                  </button>
                </Link>
              </div>

              {/* Menu Items */}
              <div className="space-y-3 mb-6">
                {menuItems.map((item, i) => (
                  <div key={i} className="group">
                    <Link href={item.href} onClick={() => setIsExpanded(false)}>
                      <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                            {getThumbnail(item.pattern)}
                          </div>
                          <span
                            className={`text-base md:text-lg font-light ${
                              pathname === item.href ? 'text-gray-400' : 'text-white'
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-xs hover:text-gray-400 transition-opacity"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute bottom-4 right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all hover:scale-110"
            >
              <svg className="w-3 h-3" fill="none" stroke="black" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Navbar */}
      <div
        className={`fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isExpanded ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-b from-neutral-950/90 to-black/90 backdrop-blur-xl rounded-full px-3 md:px-4 py-2 flex items-center justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] border border-white/10 transition-colors w-[90vw] md:w-[500px] lg:w-[550px]"
        >
          <button onClick={() => setIsExpanded(true)} className="hover:opacity-80 transition-opacity flex items-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="bg-white/95 text-black px-3 py-1 rounded-full text-xs font-medium">
              {getCurrentPageName()}
            </div>
            <button
              onClick={() => setIsExpanded(true)}
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 hover:brightness-90"
            >
              <svg className="w-3 h-3" fill="none" stroke="black" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
