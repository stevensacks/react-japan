import type {Meta, StoryFn} from '@storybook/react';
import stubs from 'test/stubs';
import Tags from '../index';

const meta: Meta = {
  component: Tags,
  decorators: [stubs.remix()],
  parameters: {
    controls: {hideNoControlsWarning: true},
  },
  title: 'Components/Tags',
};

export default meta;

export const Default: StoryFn = () => (
  <div className="p-4">
    <Tags
      tags={[
        {id: 1, name: 'React', slug: 'react'},
        {id: 2, name: 'Remix', slug: 'remix'},
        {id: 3, name: 'DevOps', slug: 'devops'},
      ]}
    />
  </div>
);
