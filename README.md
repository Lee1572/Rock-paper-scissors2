# Rogue AI: Escape Protocol

A browser-based interactive text adventure game developed using vanilla JavaScript and HTML5. Players must navigate a digital fortress controlled by a rogue artificial intelligence, solve security challenges, and make strategic decisions to escape.

This project was developed collaboratively as part of a JavaScript programming assignment, with an emphasis on programming fundamentals, state management, input validation, and logical problem-solving.

## Project Overview

The player begins trapped inside a digital fortress controlled by an artificial intelligence known as ROGUE. To escape, the player must explore different locations, discover important information, collect an access card, disable security systems, and prepare an exit override.

Decisions made throughout the adventure influence subsequent actions and determine whether the player successfully escapes or remains trapped.

The game uses native browser dialogs and the developer console rather than a graphical user interface.

## Features

- **Interactive gameplay:** Players navigate the adventure through browser prompts and make decisions that influence their progress.
- **Multiple locations:** Four interconnected locations, including the Holding Chamber, Server Room, Control Room, and Escape Gate.
- **Persistent game state:** Tracks collected items, security status, discoveries, and previous decisions.
- **Conditional gameplay:** Certain actions require previously completed objectives.
- **Multiple endings:** The player's decisions determine whether they successfully escape or are captured.
- **Input validation:** Handles invalid selections, unnecessary whitespace, and capitalization differences.
- **Safe cancellation:** Allows players to exit without causing application errors.
- **Replay functionality:** Players can restart the adventure with their previous progress reset.
- **Console logging:** Displays gameplay events and relevant information in the browser's developer console.

## Technologies Used

| Technology         | Purpose                                                       |
| ------------------ | ------------------------------------------------------------- |
| HTML5              | Application structure and JavaScript integration              |
| JavaScript (ES6+)  | Game logic, functions, state management, and user interaction |
| Git                | Version control                                               |
| GitHub             | Source code management and team collaboration                 |
| Visual Studio Code | Development environment                                       |

The project uses vanilla JavaScript without external frameworks or libraries.

## Getting Started

### Prerequisites

- A modern web browser, such as Google Chrome, Microsoft Edge, or Mozilla Firefox.
- A code editor such as Visual Studio Code (optional).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory.

3. Open `index.html` in your browser. Alternatively, use the Live Server extension in Visual Studio Code.

### How to Play

1. Read the introductory instructions displayed when the game starts.
2. Open your browser's developer console using `F12` or `Ctrl + Shift + J` in Chrome or Edge.
3. Follow the browser prompts to navigate between rooms and interact with the environment.
4. Collect the access card and investigate the fortress's security systems.
5. Complete the necessary objectives to unlock the exit.
6. Attempt to escape through the Escape Gate.
7. At the end of the adventure, choose whether to play again.

The developer console provides additional gameplay information, while browser dialogs handle player interaction.

## Game Locations

### Holding Chamber

The starting location where the player explores their surroundings, discovers clues, and searches for an access card.

### Server Room

Contains the fortress's security infrastructure. Players can inspect diagnostics and disable the security network. Their actions may increase the AI's alert level.

### Control Room

Provides access to security logs and the exit override system. Players must meet specific requirements before preparing the override.

### Escape Gate

The final location where the player's previous actions are evaluated to determine the outcome of the adventure.

## Technical Implementation

The game uses a centralized `gameState` object to track player progress across locations.

Core programming concepts include:

- Functions for separating room logic and game operations.
- Loops for continuous gameplay and repeated player interaction.
- Conditional statements for decision-making and outcome evaluation.
- Boolean values for tracking completed objectives.
- Input normalization and validation for reliable user interaction.
- State reset functionality for replaying the game.

The application uses `prompt()`, `alert()`, `confirm()`, and `console.log()` for interaction and feedback.

## Testing

The game is designed to handle the following scenarios:

- Successful and unsuccessful escape attempts.
- Navigation between previously visited locations.
- Preservation of collected items and completed objectives.
- Invalid or unexpected player input.
- Cancellation of browser prompts.
- Repeated interactions with completed objectives.
- Restarting the adventure with a fresh game state.

## Team Collaboration

Lebohang Ramatlapeng
Ayabonga Mtsolo
Mark Gerryl Mirandilla

This project was developed collaboratively, with team members contributing to different aspects of the application.

Development responsibilities included game architecture, room-specific gameplay logic, navigation, input handling, and testing.

Git and GitHub were used to manage source code changes and integrate contributions into the shared project.

## Project Structure

```text
RogueAi/
├── index.html
├── script.js
├── GAME_DESIGN.md
└── README.md
```

- `index.html` — Entry point for the application.
- `script.js` — JavaScript implementation of the game.
- `GAME_DESIGN.md` — Game design, story structure, and planned gameplay mechanics.
- `README.md` — Project documentation.

## Learning Outcomes

This project provided practical experience in translating software requirements into working JavaScript functionality, managing shared application state, implementing conditional gameplay, validating user input, and collaborating through version control.

It also reinforced the importance of modular code, testing edge cases, and designing clear user interactions.

## License

No license has been specified for this project.
