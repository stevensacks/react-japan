import {json, type MetaFunction} from '@remix-run/node';
import {Outlet} from '@remix-run/react';

export const loader = async () => {
    const title = 'RemixとNext.js - React Japan';
    const description = 'RemixとNext.jsの客観的比較';

    return json({
        description,
        title,
    });
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
    {title: data?.title},
    {
        content: data?.description,
        name: 'description',
    },
];

const RemixVsNextLayout = () => (
    <div className="container prose prose-invert mx-auto p-4 pt-0 sm:prose-lg sm:px-0">
        <div className="relative">
            <figure className="overflow-hidden rounded-lg">
                <img
                    alt="remix-vs-next"
                    src="/blog-images/headers/remix-vs-next.jpg"
                />
                <div className="absolute inset-0 flex flex-col bg-grey-900/70 p-4 text-white md:p-8">
                    <div className="flex-1">
                        <div className="text-sm text-white/70 sm:text-base">
                            2022年1月11日
                        </div>
                        <div className="text-lg font-bold sm:text-2xl md:text-4xl">
                            RemixとNext.js
                        </div>
                    </div>
                    <div className="flex flex-1 items-end">
                        <div className="flex items-center gap-4">
                            <div>
                                <img
                                    alt="Ryan Florence"
                                    className="m-0 size-8 sm:size-12 md:size-16"
                                    src="/authors/profile-ryan-florence.png"
                                />
                            </div>
                            <div>
                                <div className="text-lg font-bold leading-none sm:text-xl sm:leading-tight md:text-3xl">
                                    Ryan Florence
                                </div>
                                <div className="leading-none text-white/50 sm:leading-tight">
                                    Co-Founder
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </figure>
        </div>
        <Outlet />
    </div>
);

export default RemixVsNextLayout;
