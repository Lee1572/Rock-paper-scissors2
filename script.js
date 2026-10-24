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

function resetGame() {
  gameState.currentRoom = "holding";
  gameState.hasAccessCard = false;
  gameState.diagnosticsInspected = false;
  gameState.securityDisabled = false;
  gameState.logsRead = false;
  gameState.overridePrepared = false;
  gameState.aiAlertLevel = 0;
  gameState.gameEnded = false;
}

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
        "Rows of servers hum beneath flashing red lights.\n" +
        "ROGUE is monitoring the security network.\n\n" +
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
      gameState.diagnosticsInspected = true;

      alert(
        "SERVER DIAGNOSTICS\n\n" +
          "The central security network controls the lockdown.\n" +
          "WARNING: Disabling security without reviewing " +
          "diagnostics will alert ROGUE.\n\n" +
          "Safe shutdown procedure identified.",
      );

      console.log("Player inspected server diagnostics.");
    } else if (choice === "2") {
      if (gameState.securityDisabled) {
        alert(
          "The security network is already disabled.\n\n" +
            "No further action is necessary.",
        );
      } else {
        gameState.securityDisabled = true;

        if (!gameState.diagnosticsInspected) {
          gameState.aiAlertLevel += 1;

          alert(
            "SECURITY NETWORK DISABLED!\n\n" +
              "WARNING: ROGUE detected the unauthorized shutdown.\n" +
              "AI alert level increased!",
          );
        } else {
          alert(
            "SECURITY NETWORK DISABLED!\n\n" +
              "The safe shutdown procedure succeeded.\n" +
              "ROGUE did not detect your actions.",
          );
        }

        console.log("Security network disabled.");
        console.log("AI alert level:", gameState.aiAlertLevel);
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

function controlRoom() {
  console.log("Entered Control Room.");

  while (true) {
    const choice = getValidChoice(
      "CONTROL ROOM\n\n" +
        "You enter a room filled with surveillance monitors.\n" +
        "A central terminal controls the exit protocol.\n\n" +
        "What would you like to do?\n" +
        "1. Read security logs\n" +
        "2. Prepare exit override\n" +
        "3. Travel to another room",
      ["1", "2", "3"],
    );

    if (choice === null) {
      return null;
    }

    if (choice === "1") {
      if (!gameState.logsRead) {
        gameState.logsRead = true;

        alert(
          "SECURITY LOGS\n\n" +
            "A secondary lockdown protocol protects the exit.\n" +
            "To bypass it, an authorized access card and " +
            "a prepared exit override are required.\n\n" +
            "SECURITY LOGS DISCOVERED.",
        );

        console.log("Player read security logs.");
      } else {
        alert(
          "You have already read the security logs.\n\n" +
            "The exit requires an authorized override.",
        );
      }
    } else if (choice === "2") {
      if (gameState.overridePrepared) {
        alert(
          "The exit override has already been prepared.\n\n" +
            "You may proceed to the Escape Gate.",
        );
      } else if (!gameState.hasAccessCard || !gameState.logsRead) {
        let missingRequirements = "";

        if (!gameState.hasAccessCard) {
          missingRequirements += "- Access card\n";
        }

        if (!gameState.logsRead) {
          missingRequirements += "- Security logs\n";
        }

        alert(
          "OVERRIDE DENIED!\n\n" +
            "Missing requirements:\n" +
            missingRequirements +
            "\nComplete these objectives before trying again.",
        );
      } else {
        gameState.overridePrepared = true;

        alert(
          "EXIT OVERRIDE PREPARED!\n\n" +
            "Your access card has been verified.\n" +
            "The secondary lockdown protocol can now be bypassed.\n\n" +
            "Proceed to the Escape Gate when ready.",
        );

        console.log("Player prepared the exit override.");
      }
    } else if (choice === "3") {
      const destination = getValidChoice(
        "Where would you like to go?\n\n" +
          "1. Holding Chamber\n" +
          "2. Server Room\n" +
          "3. Escape Gate",
        ["1", "2", "3"],
      );

      if (destination === null) {
        return null;
      }

      if (destination === "1") {
        return "holding";
      } else if (destination === "2") {
        return "server";
      } else {
        return "escape";
      }
    }
  }
}

function escapeGate() {
  console.log("Entered Escape Gate.");

  while (true) {
    const choice = getValidChoice(
      "ESCAPE GATE\n\n" +
        "A massive reinforced gate stands before you.\n" +
        "ROGUE's voice echoes through the speakers:\n" +
        "'Do you really think you can escape?'\n\n" +
        "What would you like to do?\n" +
        "1. Attempt escape\n" +
        "2. Return to Control Room",
      ["1", "2"],
    );

    if (choice === null) {
      return null;
    }

    if (choice === "2") {
      return "control";
    }

    if (choice === "1") {
      const canEscape =
        gameState.hasAccessCard &&
        gameState.securityDisabled &&
        gameState.overridePrepared &&
        gameState.aiAlertLevel === 0;

      if (canEscape) {
        alert(
          "PROTOCOL BREACHED!\n\n" +
            "The gate opens and you rush outside.\n" +
            "ROGUE's security systems have been defeated!\n\n" +
            "'That was not supposed to be possible.'\n\n" +
            "CONGRATULATIONS! YOU ESCAPED!",
        );

        console.log("ENDING A: Protocol Breached.");
        console.log("Player successfully escaped.");
      } else {
        alert(
          "CONTAINMENT ACTIVATED!\n\n" +
            "The access panel flashes red.\n" +
            "The doors seal and ROGUE detects your attempt.\n\n" +
            "'Escape attempt detected. You have failed.'\n\n" +
            "GAME OVER! YOU HAVE BEEN CAPTURED!",
        );

        console.log("ENDING B: Containment.");
        console.log("Player captured by ROGUE.");
      }

      gameState.gameEnded = true;
      return null;
    }
  }
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
      "Press Cancel in a prompt to end the game.\n\n" +
      "ABOUT THE CONSOLE\n" +
      "This game logs your actions to the browser console.\n" +
      "To open it, press F12 (or Ctrl+Shift+J on Windows/Linux, " +
      "Cmd+Option+J on Mac) and click the Console tab.",
  );

  
alert(
  "MISSION BRIEFING: ESCAPE PROTOCOL\n\n" +
  "ROGUE has locked you inside its digital fortress.\n\n" +
  "Escaping requires completing a series of security objectives.\n" +
  "You cannot simply walk through the exit.\n\n" +
  "YOUR OBJECTIVES:\n\n" +
  "1. Find an access card in the Holding Chamber.\n" +
  "2. Disable the security network in the Server Room.\n" +
  "3. Investigate the security logs in the Control Room.\n" +
  "4. Prepare the exit override in the Control Room.\n" +
  "5. Proceed to the Escape Gate and attempt your escape.\n\n" +
  "IMPORTANT: Some actions depend on earlier discoveries.\n" +
  "Explore carefully and complete the objectives before escaping."
);


  console.log("ROGUE AI: Escape Protocol started.");

  let playAgain = true;

  while (playAgain) {
    resetGame();
    let quit = false;

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
        alert("Game ended. Thanks for playing!");
        quit = true;
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

    if (quit) {
      break;
    }

    playAgain = confirm("Would you like to play again?");
  }

  console.log("Game session ended.");
}

game();