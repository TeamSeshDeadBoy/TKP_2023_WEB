import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function deleteAllUsers() {
  return await prisma.user.deleteMany();
}
export async function createUser(id,{name,email,password},quizzes) {
  return await prisma.user.create({
    data: {
      id,     
      email,    
      name,        
      password,
      quizzes,
    },
  });
}
export async function deleteUserById(id) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
export async function getUser(email) {
  return await prisma.user.findUnique({
    where:{
      email: email
    }
  })
}



