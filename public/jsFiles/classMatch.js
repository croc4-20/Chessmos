class MatchmakingSystem {
  constructor() {
    this.players = []; // Registered players
    this.waitingPlayers = []; // Players waiting for a match
    this.matchHistory = []; // Match history
  }

async registerPlayer(player) {
    const chainId = 'stargaze-1';
    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    console.log("Connected wallet address:", accounts[0].address);
    this.players.push({ address: accounts[0].address, player });
    this.updateOnlinePlayersUI();
  }

  async findGame(player) {
    this.waitingPlayers.push(player);
    console.log("Waiting for another player to join...");
    setTimeout(() => {
      if (this.waitingPlayers.length === 1) {
        console.log("No other player joined. Cancelling the request.");
        const index = this.waitingPlayers.indexOf(player);
        if (index !== -1) {
          this.waitingPlayers.splice(index, 1);
        }
      }
    }, 60000); // Timeout after 1 minute

    if (this.waitingPlayers.length >= 2) {
      const player1 = this.waitingPlayers.shift();
      const player2 = this.waitingPlayers.shift();
      console.log("Match found between", player1, "and", player2);
      // Start the game between player1 and player2
      // You need to implement the game initiation logic here
    }
  }

  async proposeGame(player1, player2) {
    console.log("Proposing game from", player1, "to", player2);
    // Implement the logic to notify player2 about the game proposal
    // You can use a notification system or any other method to notify the player
    // Handle player2's response accordingly
  }

  updateOnlinePlayersUI() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = ""; // Clear the list first
    this.players.forEach(player => {
      const li = document.createElement("li");
      li.textContent = player.player;
      playerList.appendChild(li);
    });
  }


  // Additional methods for managing match history, preferences, etc.
}
