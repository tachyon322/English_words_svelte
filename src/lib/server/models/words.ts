import {db} from "./../../../../prisma/db"

/**
 * Get all words with pagination and sorting
 */
export async function getAllWords(limit: number, offset: number, sortBy: 'difficulty' | 'createdAt' = 'difficulty', searchQuery?: string) {
  try {
    const words = await db.word.findMany({
      take: limit,
      skip: offset,
      where: {
        name: {
          contains: searchQuery,
          mode: 'insensitive', // Use insensitive mode for case-insensitive search
        },
      },
      orderBy: [
        { [sortBy]: 'asc' }, // Sort by the specified column first
        { createdAt: 'desc' } // Secondary sort by creation date
      ],
      select: {
        id: true,
        name: true,
        translationToRussian: true,
        difficulty: true,
        createdAt: true,
      },
    });

    // Map to match previous output shape
    const mappedWords = words.map(word => ({
      id: word.id,
      word: word.name,
      translation: word.translationToRussian,
      difficulty: word.difficulty,
      added_at: word.createdAt,
    }));

    console.log('All words count:', mappedWords.length);
    return mappedWords;
  } catch (error) {
    console.error('Error getting all words:', error);
    return [];
  }
}

export async function getUserWords(userId: string) {
  try {
    const words = await db.userWord.findMany({
      where: {
        userId: userId
      },
      select: {
        word: {
          select: {
            name: true,
            difficulty: true,
            createdAt: true,
          }
        }
      }
    })

    const mappedWords = words.map(userWord => ({
      word: userWord.word.name,
      difficulty: userWord.word.difficulty,
      added_at: userWord.word.createdAt,
    }));

    return mappedWords;
  } catch (error) {
    console.log("Ошибка при получении getUserWords")
    return null;
  }
}