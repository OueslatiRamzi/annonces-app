// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat();

export default [
  ...compat.config({
    extends: ['next/core-web-vitals'],
    rules: {
      // Désactiver toutes les vérifications de variables non utilisées
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      
      // Désactiver d'autres règles gênantes
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off'
    }
  })
];