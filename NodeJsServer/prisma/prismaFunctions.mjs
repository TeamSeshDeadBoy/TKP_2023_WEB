/////////////////////////
// ESSENTIALS

//  uncomment after "npx prisma generate" console command
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



/////////////////////////
// OPTIONAL

// example:

export async function createUser(name, email, password) {
    return prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
  
  export async function deleteUserById(id) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }

  export async function deleteUserByEmail(email) {
    return prisma.user.delete({
      where: {
        email,
      },
    });
  }
