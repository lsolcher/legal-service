import { prisma } from './database.server';

export async function addLaw(law) {
  try {
    return await prisma.law.create({
      data: {
        title: law.title,
        content: law.content,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateLaw(law) {
  console.log('Law object:', law); // Debugging

  try {
    return await prisma.law.update({
      where: {
        id: law.id,
      },
      data: {
        title: law.title,
        content: law.content,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteLaw(lawId) {
  try {
    return await prisma.law.delete({
      where: {
        id: lawId,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getLaws = async () => {
  try {
    return await prisma.law.findMany();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLawById = async (id) => {
  try {
    return await prisma.law.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
