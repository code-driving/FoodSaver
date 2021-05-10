<<<<<<< HEAD

=======
import React from "react";
  // import { addDecorator } from "@storybook/react";
  // import { MemoryRouter } from "react-router";
  
  // addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);
import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
addDecorator(StoryRouter());
>>>>>>> 6c0341075e61592c2e7f4dda8902cd17379a5b30
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}