---
title: 'WIP - Tower Defense'
date: '2026-07-18'
description: 'A work-in-progress mobile-browser puzzle tower defense game — drag-and-drop tower "mazing" against a dynamic A* pathfinder, tower leveling, endless scaling waves, and a Firebase leaderboard.'
imageUrl: '/images/projects/private-project-tower-defence.png'
tags: ['Phaser', 'TypeScript', 'Vite', 'Firebase', 'Firestore']
liveUrl: ''
sourceUrl: ''
---

# WIP - Tower Defense

A mobile-browser "puzzle tower defense" game I'm currently building solo, in active development and not yet released. It's built on Phaser 3 with TypeScript and Vite, with a Firebase/Firestore-backed global leaderboard.

![Tower Defense gameplay — grid map, wave HUD, and the tower tray](/images/projects/private-project-tower-defence.png)

## Core Gameplay Loop

The game runs portrait, mobile-first: the grid occupies the top two-thirds of the screen, the bottom third is the tower tray and HUD. The core mechanic is "mazing" — with a limited set of towers, the player drags them onto the grid to block and lengthen the enemy path before starting a wave, rather than just placing turrets in the open. Enemies find their way from spawn to base with a dynamic A* pathfinder, so blocking the path is a real tactical choice, not cosmetic.

Once a wave starts it doesn't stop — there's no fixed enemy count or victory state. Enemy health scales up on a timer the longer a wave runs, and the displayed "wave" number is really a readout of how many of those health-scale bumps have happened. The only way the game ends is running out of lives.

## Mazing, Pathfinding, and Tower Leveling

- **Dynamic A\* pathfinding**: enemies recalculate their route in real time whenever the maze changes. Placing a tower is rejected outright if it would fully seal off the path to the base — the grid always stays theoretically solvable.
- **Drag-and-drop placement**: towers are dragged from the tray onto the grid rather than tap-selected; dropping one onto an already-placed tower upgrades it instead of placing a new one (capped at level 3), scaling its damage/range/fire-rate and swapping in progressively more detailed sprite art per level rather than just a color tint.
- **Mid-wave building**: placing or upgrading towers is allowed both before and during an active wave, immediately rerouting any enemies already in flight.
- **Object pooling**: enemies and projectiles run through `Phaser.Physics.Arcade.Group` pools instead of being instantiated/destroyed per use, since GC stutter is a real problem on mobile.

## Technical Architecture

- **Phaser 3 + TypeScript + Vite**, targeting a portrait 720×1280 base resolution with `Scale.FIT`.
- **Scene split**: `PreloaderScene`, `MainMenuScene`, `GamePlayScene` (grid, pathfinding, towers/enemies, wave state) and `UILayerScene`, which runs concurrently on top of it for the tower tray, HUD, and game-over/leaderboard panel — the two communicate only through a shared event bus, never by reaching into each other's internals.
- **Decoupled systems**: `Pathfinding` (pure A*), `GridSystem` (grid state + placement validation), `WaveManager` (endless interval-based spawning), and `ObjectPooling` all live independent of any Scene.
- **Firebase/Firestore leaderboard**: a lazily-initialized `FirebaseService` singleton submits score, level, and remaining resources at game over; without Firebase config present it degrades gracefully instead of crashing.
- **Art**: the "Free Stone Tower Defense Game Art" pack from itch.io, sorted into towers/effects/ui/projectiles, with generated placeholder tiles and enemy sprites since the pack ships neither.

## Status

Still work in progress and unreleased — no public build or repo yet. Current focus is on the core loop (mazing, pathfinding, wave scaling, tower leveling) before layering in menu polish or content variety.

## Future Improvements

- Additional tower types beyond the current single stone-tower line, each with distinct upgrade art
- Level/stage variety instead of a single random start/goal maze
- Menu and game-over screen polish, and surfacing the Firebase leaderboard more prominently
- A real win condition — the wave loop is currently endless-only by design, with "victory" scaffolded in the state types but nothing triggers it yet
