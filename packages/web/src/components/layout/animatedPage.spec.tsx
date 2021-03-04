import React from 'react';

import AnimatedPage from './animatedPage';
import { render } from '@testing-library/react';

describe('[components][layout] AnimatedPage component', () => {
  it('should render', () => {
    render(<AnimatedPage />);
  });
});
