import express from 'express';
import { createHash } from 'crypto';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import { SeededRNG } from './jsFiles/seedRng.js';
import { gameSessions, createGameSession, getGameSession } from './gameSessions.js'


const app = express();
const PORT = 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// This will store registered players
let players = [];

// This will store ongoing matches with a unique match ID
let matches = [];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.post('/register', (req, res) => {
    const walletAddress = req.body.walletAddress;

    // Check if the wallet address is already registered
    if (players.find(player => player.walletAddress === walletAddress)) {
        return res.status(400).send('This wallet is already registered for matchmaking.');
    }

    // Add the new player with a placeholder for socket ID (will be updated upon WebSocket connection)
    players.push({ walletAddress, socketId: null });

    // Inform the client of successful registration and prompt for WebSocket connection
    res.send('Registered successfully. Please connect via WebSocket to join the matchmaking queue.');
});

app.get('/matches', (req, res) => {
    res.json(matches);
});

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

function serializeSessionData(session) {
    console.log('serializeSessionData function entered session being :', session);
    return {
        gameId: session.gameId,
        players: session.players.map(player => player.walletAddress), // Example serialization
        seed: session.rng.seed // Include seed if it's relevant for the client to know
    };
}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Prompt client to register wallet address
    socket.emit('requestRegister');

    socket.on('register', ({ walletAddress }) => {
    let player = players.find(p => p.walletAddress === walletAddress);
    
    if (player) {
        console.log(`Updating socket ID for wallet ${walletAddress}`);
        player.socketId = socket.id;
    } else {
        console.log(`Registering new player with wallet ${walletAddress}`);
        players.push({ walletAddress, socketId: socket.id });
    }
    
    // Check for potential match after every new registration
    if (players.length >= 2) {
        const matchPlayers = [players.shift(), players.shift()];
        const addresses = matchPlayers.map(p => p.walletAddress);
        const gameSeed = generateSeed(addresses, matchPlayers);
        const rng = new SeededRNG(gameSeed);
        const matchId = generateMatchId();
        const gameId = generateUniqueId();
        const session = createGameSession(matchPlayers, matchId, gameId);
         gameSessions.set(gameId, session);

        console.log('session', session);
        console.log('addresses', addresses, 'gameSeed', gameSeed, 'rng', rng, 'matchId', matchId, 'gameId', gameId);
       
        matches.push({ matchId, gameId, players: matchPlayers });
        matchPlayers.forEach(player => {
        const playerSocket = io.sockets.sockets.get(player.socketId);
        
        if (playerSocket) {
            playerSocket.emit('gameCreated', { gameId: gameId });
            playerSocket.gameId = gameId;
            playerSocket.matchId = matchId; // Assign matchId to socket.
            console.log('about to emit game session update');
            playerSocket.emit('gameSessionUpdated', { gameId: gameId, sessionData: serializeSessionData(session) });
        }
    });

        notifyPlayersOfMatch(matchPlayers, matchId, gameId);
    }
});

    socket.on('move', (move) => {
        console.log('Move received:', move);
        // Broadcast or emit this move to the other client
        // For example, emitting to all other clients except the sender
        switchTurns();
        socket.broadcast.emit('move', move);
        notifyTurnChange();
    });
    
//     socket.on('castSpell', (data) => {
//     console.log('Spell cast received:', data);
//     console.log('matchId', socket.matchId, 'gameId', socket.gameId);



//      if (socket.matchId) {
//         socket.broadcast.to(socket.matchId).emit('spellCasted', {
//             matchId: socket.matchId, 
//             gameId: socket.gameId, 
//             type: data.type
//         });
//     } else {
//         console.log('No matchId associated with this socket.');
//     }
// });

// socket.on('castSpell', (data) => {
//         console.log(`Spell cast received from ${socket.id}:`, data);
//         const gameId = socket.gameId;  // Retrieve gameId stored in the socket session
//         console.log('Casting spell for gameId:', gameId);

//         const gameSession = gameSessions.get(gameId);  // Retrieve the session using gameId
//         if (!gameSession) {
//             console.log('Game session not found for ID:', gameId);
//             return;
//         }

//         const rng = gameSession.rng;  // Access the RNG object
//         console.log('RNG from session:', rng);

//         const spellResult = rng.next();  // Use RNG to determine the result of the spell
//         console.log('Spell result:', spellResult);

//         io.to(gameId).emit('spellResult', { result: spellResult, type: data.type });  // Emit to clients in the game
//     });


socket.on('castSpell', data => {
    console.log(`Spell cast received from ${socket.id}:`, data);
    const { gameId, spellType } = data;
    
    // Broadcast the spell action to other clients in the same game
    socket.to('gameRoom-' + gameId).emit('spellCasted', {
        caster: socket.id,
        spellType: spellType,
        gameId: gameId
    });
});
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Handle disconnection, such as pausing the match or notifying the opponent
    });
});
function generateSeed(addresses, matchPlayers) {
    const hash = createHash('sha256');
    addresses.forEach(addr => hash.update(addr));
    return hash.digest('hex');  // Returns a hexadecimal string, used as the RNG seed
}

// Assuming SeededRNG is already imported and available
// function createGameSession(matchPlayers, matchId) {
//     const addresses = matchPlayers.map(p => p.walletAddress);
//     const gameSeed = generateSeed(addresses);  // Ensure this function returns a consistent seed
//     const rng = new SeededRNG(gameSeed);
//     const session = {
//         matchId,
//         players: matchPlayers,
//         rng,  // RNG initialized with the game seed
//     };
//     gameSessions.set(matchId, session);  // Assuming gameSessions is a Map
//     return session;
// }


function notifyPlayersOfMatch(matchPlayers, matchId, gameId) {
    console.log(`Notifying players of match: ${matchId}`);
    
    // Randomly decide who is white and black for demonstration purposes
    const whiteIndex = Math.floor(Math.random() * matchPlayers.length);
    const blackIndex = whiteIndex === 0 ? 1 : 0; // The other index

    matchPlayers.forEach((player, index) => {
        const color = index === whiteIndex ? 'white' : 'black';
        const isWhite = color === 'white';
        console.log(`Notifying player ${player.walletAddress} of color ${color}`);
        
        // Assuming player.socketId is where you store the socket ID
        const playerSocket = io.sockets.sockets.get(player.socketId);
        
        if (playerSocket) {
            playerSocket.emit('matchFound', {
                gameId: gameId,
                matchId: matchId,
                opponent: matchPlayers[blackIndex].walletAddress, // Send the opponent's wallet address
                color: color, // 'white' or 'black'
                yourTurn: isWhite, // White starts, so true for white, false for black
            });
        } else {
            console.log(`Socket ID for player ${player.walletAddress} is not found.`);
        }
    });
}

function switchTurns() {
    // Switch turns between players
    // This function would change the 'turn' state for each player in the current game
}

function notifyTurnChange() {
    // Example implementation could involve finding the current game and its players
    // Then emitting a 'turn' event to each player with the updated turn information
    players.forEach(player => {
        io.to(player.socketId).emit('turn', { yourTurn: player.turn });
    });
}


function generateMatchId() {
    // Simple match ID generation - consider a more robust method for production
    return 'match-' + Date.now();
}
function generateUniqueId() {
    // Simple match ID generation - consider a more robust method for production
    return 'ID-' + Date.now();
}

httpServer.listen(PORT, () => {
    console.log(`Matchmaking server running on http://localhost:${PORT}`);
});
