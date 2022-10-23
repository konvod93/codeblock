import CardComponent from "../components/Card.component";
import { Post } from "../models/Post.interface";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import fs from 'fs';
import path from "path";
import matter from "gray-matter";
import { Typography } from "@mui/material";

const Blog: NextPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
    <Typography align='center' color='primary' variant='h1'>Blog</Typography>
      <div style={{ display: 'flex' }}>
        {posts.map((post: Post, index: number) => (
          <CardComponent key={index} post={post} />
        ))}
      </div>
    </>
  );
};

export default Blog

export const getStaticProps: GetStaticProps = async () => {
  const articlesDirectory = path.join('articles');

  const files = fs.readdirSync(articlesDirectory);

  const blogPosts: Post[] = files.map((fileName: string) => {
    const slug = fileName.replace('.mdx', '');

    const article = fs.readFileSync(path.join('articles', fileName));
    const { data: metaData } = matter(article);
    return { slug, metaData } as Post;
  })

  return {
    props: {
      posts:
        blogPosts.sort((a: Post, b: Post) =>
          new Date(b.metaData.dateString).valueOf() -
          new Date(a.metaData.dateString).valueOf()
        ),
    },
  };
};