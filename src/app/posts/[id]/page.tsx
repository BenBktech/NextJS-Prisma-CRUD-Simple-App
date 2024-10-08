import prisma from "@/lib/db"

export default async function PostPage({ params }: { params: { id: string } }) {

    const post = await prisma.post.findUnique({
        where: {
            id: params.id
        }
    })

    return (
        <div>
            {post?.title}
            {post?.content}
        </div>
    )
}