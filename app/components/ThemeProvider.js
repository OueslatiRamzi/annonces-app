/* eslint-disable no-unused-vars */
'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="ballouchi-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};