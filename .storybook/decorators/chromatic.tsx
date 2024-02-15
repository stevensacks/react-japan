import React from 'react';
import type {ReactRenderer} from '@storybook/react';
import type {DecoratorFunction} from '@storybook/types';

const Chromatic: DecoratorFunction<ReactRenderer> = (storyFn, context) => {
    const {parameters} = context;

    return (
        <>
            <div
                className="text-grey-900 relative bg-white"
                style={{
                    minHeight:
                        parameters.chromatic?.excludeDark ? '100vh' : '50vh',
                }}
            >
                {storyFn()}
            </div>
            {!parameters.chromatic?.excludeDark && (
                <div
                    className="bg-grey-900 dark relative text-white"
                    style={{minHeight: '50vh'}}
                >
                    {storyFn()}
                </div>
            )}
        </>
    );
};

export default Chromatic;
