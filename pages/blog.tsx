import CardComponent from "../components/Card.component";
import { Post } from "../models/Post.interface";

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