/**
 * Service for interacting with the Open Scripture API
 * API Documentation: https://openscriptureapi.org/docs/base-url
 */

// Interface for scripture data
export interface Scripture {
  reference: string;
  text: string;
  book?: string;
  chapter?: number;
  verse?: number;
}

// Collection of fallback scriptures to use when the API is unavailable
const fallbackScriptures: Scripture[] = [
  {
    reference: '2 Kings 2:23-24',
    text: '23 And he went up from thence unto Bethel: and as he was going up by the way, there came forth little children out of the city, and mocked him, and said unto him, Go up, thou bald head; go up, thou bald head.\n\n24 And he turned back, and looked on them, and cursed them in the name of the Lord. And there came forth two she bears out of the wood, and tare forty and two children of them.',
    book: '2 Kings',
    chapter: 2,
    verse: 23
  },
  {
    reference: 'John 3:16',
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    book: 'John',
    chapter: 3,
    verse: 16
  },
  {
    reference: 'Proverbs 3:5-6',
    text: '5 Trust in the Lord with all thine heart; and lean not unto thine own understanding.\n\n6 In all thy ways acknowledge him, and he shall direct thy paths.',
    book: 'Proverbs',
    chapter: 3,
    verse: 5
  },
  {
    reference: 'Matthew 5:14-16',
    text: '14 Ye are the light of the world. A city that is set on an hill cannot be hid.\n\n15 Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house.\n\n16 Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.',
    book: 'Matthew',
    chapter: 5,
    verse: 14
  },
  {
    reference: 'Alma 37:37',
    text: 'Counsel with the Lord in all thy doings, and he will direct thee for good; yea, when thou liest down at night lie down unto the Lord, that he may watch over you in your sleep; and when thou risest in the morning let thy heart be full of thanks unto God; and if ye do these things, ye shall be lifted up at the last day.',
    book: 'Alma',
    chapter: 37,
    verse: 37
  }
];

/**
 * Fetches a random scripture
 * Note: Since the Open Scripture API appears to be unavailable (404 error),
 * this implementation uses a fallback collection of scriptures
 * 
 * @returns Promise<Scripture> A promise that resolves to a scripture object
 */
export const fetchRandomScripture = async (): Promise<Scripture> => {
  try {
    // In a real implementation, we would fetch from the API
    // const response = await fetch('https://openscriptureapi.org/api/scriptures/v1/lds/en/random');
    // if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    // const data = await response.json();
    // return { reference: data.reference, text: data.text, ... };
    
    // Since the API is unavailable, we'll use our fallback collection
    // Get a random scripture from the fallback collection
    const randomIndex = Math.floor(Math.random() * fallbackScriptures.length);
    return fallbackScriptures[randomIndex];
  } catch (error) {
    console.error('Error fetching random scripture:', error);
    
    // Return a random fallback scripture if there's an error
    const randomIndex = Math.floor(Math.random() * fallbackScriptures.length);
    return fallbackScriptures[randomIndex];
  }
};
