import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType  } from "next";

import fs from 'fs';
import path from 'path';
import matter from "gray-matter";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from "next-mdx-remote";
import BlogHeaderComponent from "../../components/BlogHeader.component";

const components = {
    BlogHeaderComponent
}


export default function Article({ source, }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div style={{ width: '600px', margin: 'auto' }}>
            <MDXRemote {...source} components={components}/>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const articlesDirectory = path.join('articles');

    const files = fs.readdirSync(articlesDirectory);

    const paths = files.map((filename: string) => ({
        params: {
            slug: filename.replace('.mdx', '')
        }
    }))

    return {
        paths,
        fallback: false, //if access path/slug doesn't exist -> 404 page //

    }
}

type Params = {
    [param: string]: any;
}

export const getStaticProps: GetStaticProps<Params> = async ({ params: { slug } }: Params) => {
    const article = fs.readFileSync(path.join('articles', slug + '.mdx'));

    const { data: metaData, content } = matter(article);

    const mdxSource = await serialize(content, { scope: metaData })
    return { props: { source: mdxSource } };
}