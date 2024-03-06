import type {Meta, StoryFn} from '@storybook/react';
import stubs from 'test/stubs';
import Header from '../index';

const meta: Meta = {
    component: Header,
    decorators: [stubs.state(), stubs.remix()],
    parameters: {
        controls: {hideNoControlsWarning: true},
    },
    title: 'Components/Header',
};

export default meta;

export const Default: StoryFn = () => <Header />;
