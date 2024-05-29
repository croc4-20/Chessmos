import { SeededRNG } from './jsFiles/seedRng.js';
import { generateSeed } from './jsFiles/utility.js';

export const gameSessions = new Map();

 console.log('seededRNG', SeededRNG);
 let rng;
 // const rng = new SeededRNG(gameSeed);
 
export function generateUniqueId() {
    // Implementation to generate a unique ID for each game session
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function getGameSession(gameId) {
    console.log('Attempting to retrieve game session with ID:', gameId);
    const session = gameSessions.get(gameId);
    console.log('session being in the gameSession file :', session);
    if (session) {
        console.log('Game session retrieved:', session);
    } else {
        console.log('No game session found for ID:', gameId);
    }
    return session;
}


export function createGameSession(playerIds, gameId) {
    // console.log('createGameSession function entered, with playerId being :', playerIds, '!  rng being:', rng, '!  gameId being :', gameId,'!');
    const gameSeed = generateSeed(playerIds);
    const rng = new SeededRNG(gameSeed);
    console.log("Initialized RNG with seed:", rng);
    const session = {
        gameId,
        players: playerIds,
        rng// Random Number Generator instance specific to this session
        // additional session-related data
    };
    console.log('session value un createGameSession function', session);
    gameSessions.set(gameId, session);
    console.log('gameSessions value in createGameSession function', gameSessions);
    return session;
}


