import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Каждый тест начинает с чистого DOM, иначе запросы находят узлы предыдущего.
afterEach(() => {
  cleanup();
});
