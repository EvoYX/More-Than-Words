
import { Deck, Question } from '../types';

/**
 * REPLACE THIS URL with your actual MockAPI endpoint.
 * Format: https://[your-id].mockapi.io/api/v1
 */
const BASE_URL = 'https://67bc882fedbfbc3344487f94.mockapi.io/api/v1';

export const fetchDecks = async (): Promise<Deck[]> => {
  try {
    const response = await fetch(`${BASE_URL}/decks`);
    if (!response.ok) {
      console.warn('MockAPI endpoint not found or error. Falling back to local data.');
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (fetchDecks):", error);
    return [];
  }
};

export const updateDeckQuestions = async (deckId: number, questions: Question[]): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/decks/${deckId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions })
    });
    if (!response.ok) throw new Error('Failed to update questions');
  } catch (error) {
    console.error("API Error (updateDeckQuestions):", error);
    throw error;
  }
};

export const seedMockData = async (initialDecks: Deck[]): Promise<void> => {
    for (const deck of initialDecks) {
        await fetch(`${BASE_URL}/decks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deck)
        });
    }
};
