import type {Meta, StoryFn} from '@storybook/react';
import stubs from 'test/stubs';
import ArticlesGrid from '../index';

const meta: Meta = {
    component: ArticlesGrid,
    decorators: [stubs.remix()],
    parameters: {
        controls: {hideNoControlsWarning: true},
    },
    title: 'Components/ArticlesGrid',
};

export default meta;

const articles = [
    {
        author: {
            image: '/authors/steven.jpg',
            name: 'Steven Sacks',
            role: 'React Japan Staff',
        },
        date: 'Mar 16, 2024',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis augue eget efficitur rutrum. Proin eu rutrum orci.',
        image: '~/../public/assets/articles/remix-vs-next/header.jpg',
        tags: ['Remix', 'DevOps'],
        title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
        to: '/',
    },
    {
        author: {
            image: '/authors/steven.jpg',
            name: 'Steven Sacks',
            role: 'React Japan Staff',
        },
        date: 'Mar 16, 2024',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis augue eget efficitur rutrum. Proin eu rutrum orci. Nunc quis maximus purus. Cras iaculis, odio nec faucibus dictum, arcu nunc mollis tortor, sit amet finibus lacus felis vel est. ',
        image: '~/../.storybook/static/example.jpg',
        tags: ['React', 'Workflow'],
        title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet sagittis augue eget efficitur rutrum odio nec faucibus dictum',
        to: '/',
    },
    {
        author: {
            image: '/authors/steven.jpg',
            name: 'Steven Sacks',
            role: 'React Japan Staff',
        },
        date: 'Mar 16, 2024',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '~/../.storybook/static/example2.webp',
        tags: ['Remix'],
        title: 'Neque porro quisquam est qui',
        to: '/',
    },
];

export const Default: StoryFn = () => (
    <ArticlesGrid articles={articles} className="p-4" />
);

export const Featured: StoryFn = () => (
    <ArticlesGrid articles={articles} className="p-4" isFeatured={true} />
);
