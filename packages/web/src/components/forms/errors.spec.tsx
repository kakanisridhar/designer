import React from 'react';

import FormErrors from './errors';
import { render } from '@testing-library/react';

describe('[components][forms] FormsError component', () => {
  it('should render', () => {
    render(<FormErrors errors={{}} messages={{}} />);
  });
});
