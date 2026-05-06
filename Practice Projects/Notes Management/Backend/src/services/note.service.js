import prisma from "../config/prisma.js"

export const addNote = async (data) => {
    if(!data.user.id || !data.body.title || !data.body.content) {
        throw new Error("All fields are required")
    }

    if(!data.user.id) throw new Error("User ID is required");

    const user = await prisma.user.findUnique({
        where:{
            id: data.user.id
        }
    })

    if(!user) throw new Error("User not found")

    return await prisma.note.create({
        data:{
            title: data.body.title,
            content: data.body.content,
            user: {
                connect: {
                    id: user.id
                }
            }
        },
        select:{
            id: true,
            title: true,
            content: true,
            createdAt:true,
            updatedAt:true
        }
    })
}

export const getLoggedInUserNotes = async (data) => {
    return await prisma.user.findUnique({
        where:{
            id: data.id
        },
        include: {
            notes: true
        }
    })
}

export const getNotesById = async(id) => {
    return await prisma.note.findUnique({
        where:{
            id: Number(id)
        },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt:true,
            updatedAt:true
        }
    })  
}

export const updateNote = async(id,data) => {
    return await prisma.note.update({
        where:{
            id: Number(id)
        },
        data:{
            ...data
        },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt:true,
            updatedAt:true
        }
    })
}

export const deleteNote = async(id) => {
    return await prisma.note.delete({
        where:{
            id: Number(id)
        }
    })
}
