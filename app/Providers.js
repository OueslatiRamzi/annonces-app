/* eslint-disable no-unused-vars */
"use client";

import PropTypes from 'prop-types';
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

Providers.propTypes = {
  children: PropTypes.node.isRequired
};