import { FC } from "react";
import Image from 'next/image';

interface Props {
    title: string,
    dateString: string,
    mainImageUrl: string,
}

const BlogHeaderComponent: FC<Props> = ({ title, dateString, mainImageUrl }) => {
    return (
        <div style={{ width: '600px', margin: 'auto' }}>
            <h1>{title}</h1>
            <Image width={600} height={337} alt='post image' src={mainImageUrl} />
            <p>Posted on {dateString}</p>
        </div>
    )
}

export default BlogHeaderComponent