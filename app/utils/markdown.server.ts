import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import {unified} from 'unified';

export const convertMarkdownToHtml = async (markdown: string) =>
    String(
        await unified()
            .use(remarkParse)
            .use(remarkFrontmatter)
            .use(remarkMdxFrontmatter)
            .use(remarkGfm)
            .use(remarkRehype, {allowDangerousHtml: true})
            .use(rehypeSlug)
            .use(rehypeAutolinkHeadings)
            .use(rehypePrettyCode, {
                defaultLang: 'typescript',
                keepBackground: true,
                theme: 'monokai',
            })
            .use(rehypeStringify, {allowDangerousHtml: true})
            .process(markdown)
    );
