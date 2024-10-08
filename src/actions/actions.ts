"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function createPost(formData: FormData) {
    try {
        await prisma.post.create({
            data: {
                title: formData.get("title") as string,
                slug: (formData.get("title") as string).replace(/ /g, "-").toLocaleLowerCase(),
                content: formData.get("content") as string,
                author: {
                    connect: {
                        email: "john@gmail.com"
                    }
                }
            }
        })
        revalidatePath("/posts")
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code === "P2002") {
                console.log("There is a unique constraint violation")
            }
        }
    }
    
}

// export async function editPost(formData: FormData, id: string) {
//     await prisma.post.update({
//         where: {
//             id: id
//         },
//         data: {
//             title: formData.get("title") as string,
//             slug: (formData.get("title") as string).replace(/ /g, "-").toLocaleLowerCase(),
//             content: formData.get("content") as string
//         }
//     })
// }

// export async function deletePost(id: string) {
//     await prisma.post.delete({
//         where: {
//             id: id
//         }
//     })
//     revalidatePath("/posts")
// }
