import type {Meta, StoryFn} from '@storybook/react';
import stubs from 'test/stubs';
import ArticlesListItem from '../index';

const meta: Meta = {
    component: ArticlesListItem,
    decorators: [stubs.remix()],
    parameters: {
        controls: {hideNoControlsWarning: true},
    },
    title: 'Components/ArticlesList',
};

export default meta;

export const Item: StoryFn = () => (
    <div className="p-4 md:max-w-[40rem]">
        <ArticlesListItem
            meta={{
                author: {
                    image: '/authors/jacob-paris.jpg',
                    name: 'Jacob Paris',
                    role: 'Contributor',
                },
                date: 'Mar 16, 2024',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis augue eget efficitur rutrum. Proin eu rutrum orci. Nunc quis maximus purus. Cras iaculis, odio nec faucibus dictum, arcu nunc mollis tortor, sit amet finibus lacus felis vel est. ',
                title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
            }}
        />
    </div>
);
