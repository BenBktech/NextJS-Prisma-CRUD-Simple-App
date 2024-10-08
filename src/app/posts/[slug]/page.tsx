import prisma from "@/lib/db"
import { unstable_cache as cache } from "next/cache";

const getCachedPost = cache(async (slug: string) => {
    return prisma.post.findUnique({
        where: {
            slug: slug
        },
        cacheStrategy: {
            ttl: 60
        }
    })
})

export default async function PostPage({ params }: { params: { slug: string } }) {

    // const post = await prisma.post.findUnique({
    //     where: {
    //         slug: params.slug
    //     }
    // })

    const post = await getCachedPost(params.slug);

    return (
        <div>
            {post?.title}
            {post?.content}
        </div>
    )
}