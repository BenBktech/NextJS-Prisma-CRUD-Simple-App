import prisma from "@/lib/db"

export default async function PostPage({ params }: { params: { slug: string } }) {

    const post = await prisma.post.findUnique({
        where: {
            slug: params.slug
        }
    })

    return (
        <div>
            {post?.title}
            {post?.content}
        </div>
    )
}