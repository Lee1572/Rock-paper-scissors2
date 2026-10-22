const gameState = {
  currentRoom: "holding",
  hasAccessCard: false,
  securityDisabled: false,
  logsRead: false,
  overridePrepared: false,
  aiAlertLevel: 0,
  gameEnded: false,
};

function normalizeChoice(input) {
  return input.trim().toLowerCase();
}

function getValidChoice(message, validChoices) {
  while (true) {
    const input = prompt(message);

    if (input === null) {
      return null;
    }

    const choice = normalizeChoice(input);

    if (validChoices.includes(choice)) {
      return choice;
    }

    alert("Invalid choice. Please try again.");
  }
}

function holdingChamber() {
  console.log("Entered Holding Chamber.");

  const choice = getValidChoice(
    "HOLDING CHAMBER\n\n" +
      "1. Visit Server Room\n" +
      "2. Visit Control Room\n" +
      "3. Visit Escape Gate",
    ["1", "2", "3"],
  );

  if (choice === null) return null;
  if (choice === "1") return "server";
  if (choice === "2") return "control";
  return "escape";
}

function serverRoom() {
  console.log("Entered Server Room.");

  const choice = getValidChoice(
    "SERVER ROOM\n\n" +
      "1. Return to Holding Chamber\n" +
      "2. Visit Control Room\n" +
      "3. Visit Escape Gate",
    ["1", "2", "3"],
  );

  if (choice === null) return null;
  if (choice === "1") return "holding";
  if (choice === "2") return "control";
  return "escape";
}

function controlRoom() {
  console.log("Entered Control Room.");

  const choice = getValidChoice(
    "CONTROL ROOM\n\n" +
      "1. Return to Holding Chamber\n" +
      "2. Visit Server Room\n" +
      "3. Visit Escape Gate",
    ["1", "2", "3"],
  );

  if (choice === null) return null;
  if (choice === "1") return "holding";
  if (choice === "2") return "server";
  return "escape";
}

function escapeGate() {
  console.log("Entered Escape Gate.");

  const choice = getValidChoice(
    "ESCAPE GATE\n\n" +
      "1. Return to Control Room\n" +
      "2. Return to Holding Chamber",
    ["1", "2"],
  );

  if (choice === null) return null;
  if (choice === "1") return "control";
  return "holding";
}

function game() {
  const startGame = confirm(
    "ROGUE AI: ESCAPE PROTOCOL\n\n" +
      "You are trapped inside a facility controlled by a rogue AI.\n" +
      "Explore the rooms, uncover clues, and find a way to escape.\n\n" +
      "Are you ready to begin?",
  );

  if (!startGame) {
    console.log("Game cancelled. The facility remains sealed.");
    return;
  }

  alert(
    "HOW TO PLAY\n\n" +
      "Use the prompts to choose your actions.\n" +
      "Read alerts carefully for clues.\n" +
      "Your decisions will affect what happens later.\n" +
      "You can revisit rooms, but your progress will persist.\n\n" +
      "Press Cancel in a prompt to end the game.",
  );

  console.log("ROGUE AI: Escape Protocol started.");

  while (!gameState.gameEnded) {
    let nextRoom;

    switch (gameState.currentRoom) {
      case "holding":
        nextRoom = holdingChamber();
        break;

      case "server":
        nextRoom = serverRoom();
        break;

      case "control":
        nextRoom = controlRoom();
        break;

      case "escape":
        nextRoom = escapeGate();
        break;

      default:
        console.error("Unknown room:", gameState.currentRoom);
        gameState.gameEnded = true;
        break;
    }

    if (gameState.gameEnded) {
      break;
    }

    if (nextRoom === null) {
      gameState.gameEnded = true;
      break;
    }

    const validRooms = ["holding", "server", "control", "escape"];

    if (!validRooms.includes(nextRoom)) {
      console.error("Invalid room destination:", nextRoom);
      gameState.gameEnded = true;
      break;
    }

    gameState.currentRoom = nextRoom;
  }

  console.log("Game session ended.");
}

game();
