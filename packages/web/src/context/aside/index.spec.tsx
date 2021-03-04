import React from 'react';

import { AsideProvider } from './';
import { render } from '@testing-library/react';

describe('[context] Aside Provider', () => {
  it('should render', () => {
    render(<AsideProvider />);
  });
});
