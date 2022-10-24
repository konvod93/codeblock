import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useState } from "react";
import CardComponent from "../components/Card.component";
import { Post } from "../models/Post.interface";

import fs from 'fs';
import path from "path";
import matter from "gray-matter";
import { TextField, Typography, Chip, Stack, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Tag } from "../models/Tag";


const Blog: NextPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filtredPosts, setFiltredPosts]= useState(posts);
  const [postTitles, setPostTitles] = useState<string[]>(
    posts.map((post: Post) => post.metaData.title.toLowerCase())
    );
  const [searchString, setSearchString] = useState<Post[]>(posts);
  const [isAllTag, setIsAllTag] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  return (
    <>
      <Typography align='center' color='primary' variant='h1'>
        Blog
      </Typography>
      <Paper>
        <TextField style={{ width: 400 }} placeholder='Search...' value={}/>
      </Paper>
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