import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function deleteAllUsers() {
  return await prisma.user.deleteMany();
}
export async function createUser(id,data) {
  data.id = id;
  return await prisma.user.create({
    data: data,
  });
}
export async function deleteUserById(id) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
export async function deleteUserByEmail(email) {
  return await prisma.user.delete({
    where: {
      email,
    },
  });
}


