import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function updateUsersQuizzes(data) {
    return await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        Quizzes: data.quizzes,
      },
    });
}
  

// export async function _addQuiz(userId, quiz) {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//       select: {
//         Quizzes: true,
//       },
//     });
  
//     if (!user) {
//       // Handle the case where the user with the specified ID is not found
//       return null;
//     }
  
//     const updatedQuizzes = [...user.Quizzes, quiz];
  
//     await prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         Quizzes: updatedQuizzes,
//       },
//     });
//     return updatedQuizzes;
//   }