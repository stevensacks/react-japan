import type {Meta, StoryFn} from '@storybook/react';
import stubs from 'test/stubs';
import type {ArticleMeta} from '~/types';
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

const articles: Array<ArticleMeta> = [
    {
        author: {
            id: 1,
            image: '/authors/steven.jpg',
            name: 'Steven Sacks',
            role: 'React Japan Staff',
        },
        date: 'Mar 16, 2024',
        excerpt:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis augue eget efficitur rutrum. Proin eu rutrum orci.',
        hero: '~/../public/assets/articles/remix-vs-next/header.jpg',
        id: 1,
        slug: '/',
        tags: [
            {id: 1, name: 'Remix', slug: 'remix'},
            {id: 3, name: 'DevOps', slug: 'devops'},
        ],
        title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    },
    {
        author: {
            id: 1,
            image: '/authors/steven.jpg',
            name: 'Steven Sacks',
            role: 'React Japan Staff',
        },
        date: 'Mar 16, 2024',
        excerpt:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis augue eget efficitur rutrum. Proin eu rutrum orci. Nunc quis maximus purus. Cras iaculis, odio nec faucibus dictum, arcu nunc mollis tortor, sit amet finibus lacus felis vel est. ',
        hero: '~/../.storybook/static/example.jpg',
        id: 2,
        slug: '/',
        tags: [
            {id: 1, name: 'Remix', slug: 'remix'},
            {id: 2, name: 'React', slug: 'react'},
        ],
        title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet sagittis augue eget efficitur rutrum odio nec faucibus dictum',
    },
    {
        author: {
            id: 1,
            image: '/authors/steven.jpg',
            name: 'Steven Sacks',
            role: 'React Japan Staff',
        },
        date: 'Mar 16, 2024',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        hero: '~/../.storybook/static/example2.webp',
        id: 3,
        slug: '/',
        tags: [{id: 1, name: 'Remix', slug: 'remix'}],
        title: 'Neque porro quisquam est qui',
    },
];

export const Default: StoryFn = () => (
    <ArticlesGrid articles={articles} className="p-4" />
);

export const Featured: StoryFn = () => (
    <ArticlesGrid articles={articles} className="p-4" isFeatured={true} />
);
