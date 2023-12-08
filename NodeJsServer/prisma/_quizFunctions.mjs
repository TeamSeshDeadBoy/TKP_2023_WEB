import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function updateUsersQuizzes(userId,quizzes) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        quizzes: quizzes,
      },
    });
}
export async function setUsersCurrentQuizInd(userId, quizInd) {
  return await prisma.user.update({
      where: {
          id: userId
      },
      data:{
        currentQuizInd: quizInd
      }
  });
}

export async function getUsersCurrentQuizInd(userId){
    const user = await prisma.user.findUnique({
      where:{
        id:userId
      },
      select:{
        currentQuizInd: true
      }
    })
    if (user.currentQuizInd) return user.currentQuizInd
    else return null
}