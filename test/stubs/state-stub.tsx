import type {ReactRenderer} from '@storybook/react';
import type {PartialStoryFn} from '@storybook/types';
import State from '~/state';

const decorator =
  // eslint-disable-next-line react/display-name
  () => (Story: PartialStoryFn<ReactRenderer>) => (
    <State>
      <Story />
    </State>
  );

export default decorator;
