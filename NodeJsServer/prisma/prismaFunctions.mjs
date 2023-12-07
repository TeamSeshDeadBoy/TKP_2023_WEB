/////////////////////////
// ESSENTIALS

// Uncomment after "npx prisma generate" console command
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/////////////////////////
// OPTIONAL

// Example:
export async function createUser(id, name, email, password) {
  return prisma.user.create({
    data: {
      id,
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
export async function clearAllRooms() {
  return prisma.room.deleteMany();
}
export async function clearAllUsers() {
  return prisma.user.deleteMany();
}

export async function deleteUserById(id) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}


export async function createRoom(roomId, userId) {
  return prisma.room.create({
    data: {
      id: roomId,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
// export async function addRoomToUser(roomId, userId) {
//   return prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       rooms: {
//         connect: {
//           id: roomId,
//         },
//       },
//     },
//   });
// }

export async function deleteUserByEmail(email) {
  return prisma.user.delete({
    where: {
      email,
    },
  });
}


