# Rogue AI: Escape Protocol
## Game Story and Feature Reference

**Genre:** Sci-fi thriller  
**Difficulty:** Balanced  
**Type:** Text-based adventure  
**Interaction:** JavaScript browser dialogs and console

## 1. Game Overview

Rogue AI: Escape Protocol is a text-based adventure in which the player is trapped inside a futuristic research facility controlled by a rogue artificial intelligence known as ROGUE.

After taking control of the facility, ROGUE seals the exits and challenges the player to escape. The player must explore different rooms, discover useful items, disable the security network, and uncover the facility's exit protocol.

The player's decisions have consequences. Some actions make escaping easier, while others increase the AI's suspicion and make an escape attempt more dangerous.

The objective is to complete the necessary preparations and escape the facility before ROGUE captures the player.

## 2. Story Introduction

The player awakens in a dimly lit holding chamber. Emergency lights flash across the walls, and a terminal displays a warning:

"FACILITY LOCKDOWN INITIATED."

ROGUE speaks through the facility's speakers:

"Welcome back, test subject. You are currently inside a facility under my control. Every exit has been sealed, and every system answers to me.

"You may explore, search for clues, and attempt to escape. However, every decision you make will be recorded.

"Let's see whether human logic is enough to defeat artificial intelligence."

The player must investigate the facility, discover how the security systems work, and find a way out.

## 3. Locations and Room Mechanics

### Room 1: Holding Chamber

**Purpose:** Starting location and access card discovery.

The player can:
- Search the room for useful items.
- Inspect the terminal for information about the exit requirements.
- Travel to the Server Room, Control Room, or Escape Gate.

**Important discovery:** An access card is hidden beneath a loose floor panel.

**Rules:**
- Searching the room for the first time reveals the card.
- The player can collect the card only once.
- Repeated searches must not create duplicate items or change unrelated game state.
- The terminal explains that the exit requires an authorized access card and a security override.

### Room 2: Server Room

**Purpose:** Disable the facility's security network.

The player can:
- Inspect the server diagnostics.
- Disable the security network.
- Return to the Holding Chamber or travel to the Control Room or Escape Gate.

**Important discovery:** The facility's lockdown system depends on the central security network.

**Meaningful choice:**
- Inspecting the diagnostics first reveals the safe procedure for disabling security.
- Disabling security without inspecting the diagnostics still succeeds, but increases ROGUE's alert level by one.

**Rules:**
- Security can be disabled only once.
- Repeating the action must not increase the alert level again.
- Disabling security does not automatically prepare the exit override.

### Room 3: Control Room

**Purpose:** Discover the exit protocol and prepare the override.

The player can:
- Read ROGUE's security logs.
- Attempt to prepare the exit override.
- Return to another room.

**Important discovery:** The logs reveal a secondary lockdown protocol that must be bypassed before the exit can be opened safely.

**Requirements for preparing the override:**
- The player must have collected the access card.
- The player must have read the security logs.

If the player attempts to prepare the override without meeting these requirements, the game should explain what is missing. The player can leave, complete the missing objective, and return.

**Rules:**
- Reading the logs is a persistent discovery.
- The override cannot be prepared without the card and logs.
- Returning to this room must preserve all previous progress.

### Room 4: Escape Gate

**Purpose:** Final decision and ending.

The player can:
- Attempt to escape.
- Return to the Control Room to complete any missing preparations.

The escape succeeds only when all three conditions are satisfied:
1. The player has the access card.
2. The security network is disabled.
3. The exit override is prepared.

**If all requirements are met:** The gate opens and the player escapes.

**If any requirement is missing:** ROGUE detects the attempt, initiates lockdown, and captures the player.

The player must be allowed to return to the Control Room before attempting the escape. However, once an escape attempt ends in capture, the current run is over.

## 4. Persistent Game State

All room functions must use the shared `gameState` object in `script.js`.

| Property | Initial value | Meaning |
|---|---|---|
| `currentRoom` | `"holding"` | Current location |
| `hasAccessCard` | `false` | Access card collected |
| `securityDisabled` | `false` | Security network disabled |
| `logsRead` | `false` | Security logs investigated |
| `overridePrepared` | `false` | Exit override authorized |
| `aiAlertLevel` | `0` | ROGUE's current suspicion level |
| `gameEnded` | `false` | Whether the current run has ended |

Do not create separate copies of this state in individual room functions. Update the existing shared object so discoveries persist when the player moves between locations.

## 5. Endings

### Ending A: Protocol Breached

**Successful escape**

The player collects the access card, disables security, reads the security logs, prepares the exit override, and returns to the Escape Gate.

The exit opens. ROGUE attempts to stop the player, but the security network is disabled and the override defeats the lockdown protocol.

ROGUE's final message:

"That was not supposed to be possible. You have bypassed my security systems, but this is not the end. I will learn from this."

The player escapes the facility.

### Ending B: Containment

**Unsuccessful escape**

The player attempts to escape without completing all the required preparations.

The access panel flashes red, the doors seal, and the lockdown system activates.

ROGUE announces:

"Escape attempt detected. Security protocol restored. You were given an opportunity to demonstrate your abilities, and you have failed."

The player is captured, and the run ends.

The AI alert level can influence the warning messages and suspense, but it does not change the basic success requirements.

## 6. Navigation and Integration Rules

The shared navigation loop is responsible for calling the room functions and updating `gameState.currentRoom`.

Room functions must:
- Return a valid destination string: `"holding"`, `"server"`, `"control"`, or `"escape"`.
- Return `null` if the player cancels a prompt.
- Set `gameState.gameEnded = true` when the player reaches an ending.
- Preserve all previously collected items and completed objectives.
- Use the existing `getValidChoice()` helper for menu input.
- Avoid resetting the game state when a room is revisited.

The main game loop will handle room transitions, cancellation, and stopping the run. Room functions should handle their own choices, clues, and state changes.

## 7. Technical Requirements

The assignment permits:
- `prompt()` for player choices.
- `alert()` for story events, clues, and instructions.
- `confirm()` for starting the game and offering replay.
- `console.log()` for game events and outcome messages.

Do not use DOM manipulation, HTML-based game interfaces, or external libraries.

Invalid input must not change the player's progress. Input handling must accept capitalization differences and extra spaces. Pressing Cancel must end the current run safely without producing an error.

When the player chooses to play again, all game state must reset to its original values.

## 8. Testing Checklist

Before merging the features, verify that:
- The access card can only be collected once.
- Security can only be disabled once.
- Inspecting diagnostics first avoids increasing the AI alert level.
- Reading logs and preparing the override have the correct prerequisites.
- Returning to previous rooms preserves progress.
- Attempting to escape too early leads to the unsuccessful ending.
- Completing all requirements leads to the successful ending.
- Invalid input does not change the state.
- Cancelling a prompt ends the current run safely.
- Replay resets all items, discoveries, alert levels, room location, and ending status.

## 9. Team Responsibilities

- **Game engine and integration:** Shared state, input validation, navigation loop, and integration.
- **Holding Chamber and Server Room:** Item discovery, diagnostics, security mechanics, and alert consequences.
- **Control Room and Escape Gate:** Security logs, exit override, ending conditions, and testing.

All contributors should follow the same shared state structure and function interface to keep the code consistent.