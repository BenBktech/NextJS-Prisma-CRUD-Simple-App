import Link from "next/link"
import prisma from "@/lib/db"
import { createPost } from "@/actions/actions"

export default async function PostsPage() {

    // const posts = await prisma.post.findMany({
    //     where: {
    //         // title: {
    //         //     endsWith: "Post"
    //         // }
    //     },
    //     orderBy: {
    //         createdAt: "desc"
    //     },
    //     select: {
    //         id: true,
    //         title: true,
    //         slug: true
    //     }
    // })

    const user = await prisma.user.findUnique({
        where: {
            email: "john@gmail.com"
        },
        include: {
            posts: true
        }
    })

    const totalPosts = await prisma.post.count()

    return (
        <div>
            <h1>Posts ({totalPosts})</h1>
            <ul>
                {user?.posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>

            <form action={createPost}>
                <input type="text" name="title" placeholder="Title" />
                <textarea name="content" placeholder="Content"></textarea>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}