'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
};

export default function FloatingNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent scroll when expanded
  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  }, [isExpanded]);

  const menuItems = [
    { name: 'Home', pattern: 'diagonal-lines', href: '/' },
    { name: 'Gallery', pattern: 'work', href: '/gallery' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Contact', href: '/contact' },
  ];

  const currentPage = useMemo(
    () => menuItems.find((item) => item.href === pathname)?.name ?? 'Home',
    [pathname]
  );

  const getThumbnail = (pattern: string) => {
    const iconWrapper =
      'w-full h-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors';
    const svgProps = 'w-6 h-6 text-white';
    const icons: Record<string, React.JSX.Element> = {
      'diagonal-lines': (
        <div className={iconWrapper}>
          <svg className={svgProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l9-9 9 9v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" />
          </svg>
        </div>
      ),
      'group-photo': (
        <div className={iconWrapper}>
          <svg className={svgProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0" />
          </svg>
        </div>
      ),
      work: (
        <div className={iconWrapper}>
          <svg className={svgProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M5 10h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
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
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-6 md:bottom-8 left-1/2 z-40 -translate-x-1/2 bg-gradient-to-b from-black/95 to-neutral-950/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_10px_60px_-10px_rgba(0,0,0,0.8)] w-[90vw] md:w-[500px] lg:w-[550px] overflow-hidden"
          >
            <div className="relative p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              {/* Ambient Glow */}
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
                  <Link key={i} href={item.href} onClick={() => setIsExpanded(false)} className="group block">
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
                ))}
              </div>

              {/* Footer */}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
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
              className="absolute bottom-[8px] right-3 md:right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all hover:scale-110"
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
          className="bg-gradient-to-b from-neutral-950/90 to-black/90 backdrop-blur-xl rounded-full px-3 md:px-4 py-2 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] border border-white/10 transition-colors w-[90vw] md:w-[500px] lg:w-[550px] relative"
        >
          <button
            onClick={() => setIsExpanded(true)}
            aria-expanded={isExpanded}
            aria-controls="expanded-navbar"
            className="hover:opacity-80 transition-opacity flex items-center absolute left-3 md:left-4"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-1 rounded-full text-sm tracking-wide shadow-[inset_0_0_10px_rgba(255,255,255,0.15)]"
            >
              {currentPage}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => setIsExpanded(true)}
            className="w-7 h-7 bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 hover:brightness-90 absolute right-3 md:right-4"
          >
            <svg className="w-3 h-3" fill="none" stroke="black" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </motion.div>
      </div>
    </>
  );
}