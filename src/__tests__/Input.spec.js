import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Input from '../controls/Input';

afterEach(cleanup);

test('InputComponent', () => {
  const changeHandler = jest.fn().mockImplementation(() => {
    return 1;
  });

  const props = {
    label: 'Search',
    type: 'text',
    placeholder: 'What do you want to find?',
    value: 'default',
    onChange: changeHandler,
  };
  const { container, getByText, getByDisplayValue } = render(<Input {...props} />);

  const input = getByDisplayValue('default');
  fireEvent.change(input, { target: { value: 'a' } });

  expect(getByText('Search')).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(changeHandler).toHaveBeenCalled();

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <label
        class="label-0-0-1"
        for="Search"
      >
        <p>
          Search
        </p>
        <input
          class="input-0-0-2"
          id="input-search"
          name="Search"
          placeholder="What do you want to find?"
          type="text"
          value="default"
        />
      </label>
    </div>
  `);
});
