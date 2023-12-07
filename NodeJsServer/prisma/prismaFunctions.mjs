/////////////////////////
// ESSENTIALS

// Uncomment after "npx prisma generate" console command
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/////////////////////////
// OPTIONAL

// Example:
export async function createUser(name, email, password) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

export async function getAllRoomIds() {
  const rooms = await prisma.room.findMany();
  const roomIds = rooms.map(room => room.id);
  return roomIds;
}

export async function deleteUserById(id) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function addRoomToUser(roomId, userId) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      rooms: {
        connect: {
          id: roomId,
        },
      },
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

// export async function createRoom(id) {
//   return prisma.room.create({
//     data: {
//       id: id,
//     },
//   });
// }
