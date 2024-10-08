import Link from "next/link"
import prisma from "@/lib/db"

export default async function PostsPage() {

    const posts = await prisma.post.findMany({
        where: {
            title: {
                endsWith: "Post"
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true,
            slug: true
        }
    })

    const totalPosts = await prisma.post.count()

    return (
        <div>
            <h1>Posts ({totalPosts})</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>

            <form>
                <input type="text" name="title" placeholder="Title" />
                <textarea name="content" placeholder="Content"></textarea>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}