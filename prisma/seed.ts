import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPosts: Prisma.PostCreateInput[] = [
    {
        title: "My First Post",
        slug: "my-first-post",
        content: "This is the body of my first post",
        author: {
            connectOrCreate: {
                where: {
                    email: "john@gmail.com"
                },
                create: {
                    email: "john@gmail.com",
                    hashedPassword: "hashedPassword"
                }
            }
        }
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const post of initialPosts) {
        const newPost = await prisma.post.create({
            data: post
        })
        console.log(`Created post with id: ${newPost.id}`)
    }
    console.log(`Seeding finished.`)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })