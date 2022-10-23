import CardComponent from "../components/Card.component";
import { Post } from "../models/Post.interface";
import { GetStaticProps } from "next";
import fs from 'fs';
import path from "path";
import matter from "gray-matter";

const Blog = () => {
    return (
    <div>
        {posts.map((post: Post, index: number) => (
          <CardComponent key={index} post={post} />
        ))}
    </div>
    );
};

export default Blog

export const getStaticProps: GetStaticProps = async () => {
    const articlesDirectory = path.join('articles');
  
    const files = fs.readdirSync(articlesDirectory);
  
    const blogPosts = files.map((fileName: string) => {
      const slug = fileName.replace('.mdx', '');
  
      const article = fs.readFileSync(path.join('articles', fileName));
      const { data: metaData } = matter(article);
      return { slug, metaData }
    })
   
    return { props: { posts: blogPosts } };
  }