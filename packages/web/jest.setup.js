import 'jest-ts-auto-mock';
import '@testing-library/jest-dom';
import 'jest-extended';
import 'jest-chain';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '.env.test'),
});
