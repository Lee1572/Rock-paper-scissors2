const gameState = {
  currentRoom: "holding",
  hasAccessCard: false,
  diagnosticsInspected: false,
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

  while (true) {
    const choice = getValidChoice(
      "HOLDING CHAMBER\n\n" +
        "The emergency lights flicker overhead. " +
        "A terminal glows beside a locked door.\n\n" +
        "What would you like to do?\n" +
        "1. Search the room\n" +
        "2. Inspect the terminal\n" +
        "3. Travel to another room",
      ["1", "2", "3"],
    );

    if (choice === null) {
      return null;
    }

    if (choice === "1") {
      if (!gameState.hasAccessCard) {
        gameState.hasAccessCard = true;

        alert(
          "You move a loose floor panel and discover " +
            "an access card hidden underneath it.\n\n" +
            "ACCESS CARD ACQUIRED.",
        );

        console.log("Player collected the access card.");
      } else {
        alert(
          "You search beneath the floor panel again, " +
            "but the compartment is empty.\n\n" +
            "You already collected the access card.",
        );

        console.log("Access card already collected.");
      }
    } else if (choice === "2") {
      alert(
        "TERMINAL MESSAGE\n\n" +
          "FACILITY LOCKDOWN ACTIVE.\n\n" +
          "The exit requires an authorized access card " +
          "and a security override.\n\n" +
          "The central security network controls the " +
          "facility's lockdown system. Investigate the " +
          "Server Room and Control Room for more information.",
      );

      console.log("Player inspected the holding chamber terminal.");
    } else if (choice === "3") {
      const destination = getValidChoice(
        "Where would you like to go?\n\n" +
          "1. Server Room\n" +
          "2. Control Room\n" +
          "3. Escape Gate",
        ["1", "2", "3"],
      );

      if (destination === null) {
        return null;
      }

      if (destination === "1") {
        return "server";
      } else if (destination === "2") {
        return "control";
      } else {
        return "escape";
      }
    }
  }
}

function serverRoom() {
  console.log("Entered Server Room.");

  while (true) {
    const choice = getValidChoice(
      "SERVER ROOM\n\n" +
        "Rows of server racks hum in the darkness. " +
        "A warning flashes across the main console:\n\n" +
        "SECURITY NETWORK: ACTIVE\n\n" +
        "What would you like to do?\n" +
        "1. Inspect server diagnostics\n" +
        "2. Disable security network\n" +
        "3. Travel to another room",
      ["1", "2", "3"],
    );

    if (choice === null) {
      return null;
    }

    if (choice === "1") {
      if (!gameState.securityDisabled) {
        gameState.diagnosticsInspected = true;

        alert(
          "SERVER DIAGNOSTICS\n\n" +
            "You examine the security network's control panel.\n\n" +
            "DIAGNOSTIC REPORT:\n" +
            "The network can be disabled manually, but doing " +
            "so without checking the system first may alert ROGUE.\n\n" +
            "RECOMMENDATION: Review diagnostics before " +
            "disabling the network.",
        );

        console.log("Player inspected server diagnostics.");
      } else {
        alert(
          "The diagnostics confirm that the security " +
            "network is already offline.",
        );
      }
    } else if (choice === "2") {
      if (gameState.securityDisabled) {
        alert(
          "The security network is already disabled. " +
            "There is nothing more to do here.",
        );
      } else {
        gameState.securityDisabled = true;

        if (gameState.diagnosticsInspected) {
          alert(
            "You follow the diagnostic procedure and " +
              "carefully shut down the security network.\n\n" +
              "SECURITY NETWORK: OFFLINE\n\n" +
              "The shutdown succeeds without alerting ROGUE.",
          );

          console.log(
            "Security disabled successfully. " + "AI alert level unchanged.",
          );
        } else {
          gameState.aiAlertLevel += 1;

          alert(
            "You force the security network offline.\n\n" +
              "SECURITY NETWORK: OFFLINE\n\n" +
              "Suddenly, warning lights flash across the room.\n" +
              'ROGUE: "Unauthorized system interference detected."\n\n' +
              "Your actions have attracted the AI's attention.",
          );

          console.log(
            "Security disabled without checking diagnostics. " +
              "AI alert level increased to " +
              gameState.aiAlertLevel +
              ".",
          );
        }
      }
    } else if (choice === "3") {
      const destination = getValidChoice(
        "Where would you like to go?\n\n" +
          "1. Holding Chamber\n" +
          "2. Control Room\n" +
          "3. Escape Gate",
        ["1", "2", "3"],
      );

      if (destination === null) {
        return null;
      }

      if (destination === "1") {
        return "holding";
      } else if (destination === "2") {
        return "control";
      } else {
        return "escape";
      }
    }
  }
}

function controlRoom() {}

function escapeGate() {}

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
