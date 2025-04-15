import { sql } from '../db';

export async function getUserWords(userId: string) {
  return await sql`
    SELECT w.id, w.name as word, w.difficulty, w."createdAt" as added_at
    FROM "word" w
    JOIN "_wordToUser" wu ON w.id = wu."A"
    WHERE wu."B" = ${userId}
    ORDER BY w."createdAt" DESC
  `;
}

export async function getUserStats(userId: string) {
  const totalWords = await sql`
    SELECT COUNT(*) as total
    FROM "word" w
    JOIN "_wordToUser" wu ON w.id = wu."A"
    WHERE wu."B" = ${userId}
  `;
  
  const wordsByDifficulty = await sql`
    SELECT w.difficulty, COUNT(*) as count
    FROM "word" w
    JOIN "_wordToUser" wu ON w.id = wu."A"
    WHERE wu."B" = ${userId}
    GROUP BY w.difficulty
  `;
  
  const lastAddedWords = await sql`
    SELECT w.id, w.name as word, w.difficulty, w."createdAt" as added_at
    FROM "word" w
    JOIN "_wordToUser" wu ON w.id = wu."A"
    WHERE wu."B" = ${userId}
    ORDER BY w."createdAt" DESC
    LIMIT 5
  `;
  
  return {
    totalWords: totalWords[0]?.total || 0,
    wordsByDifficulty,
    lastAddedWords
  };
}
