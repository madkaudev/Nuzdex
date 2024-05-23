#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

// Retrieve model
const Move = require("./models/move");

// Create array for records
const moves = [];

// Set up mongoDB connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];
main().catch((err) => console.log(err));
async function main() {
    console.log("Connecting to the database.");
    await mongoose.connect(mongoDB);
    console.log("Creating moves.");
    await createMoves();
    console.log("Closing connection.");
    mongoose.connection.close();
}

// Create a record of a move
async function moveCreate(index, name, gen, type, category, pp, description, priority, power, accuracy, critRate, effect, effectRate) {
    // Create move instance
    const moveDetail = { name: name, type: type, category: category, pp: pp, description: description, priority: priority };
    if (power != "N/A") moveDetail.power = power
    if (accuracy != "N/A") moveDetail.accuracy = accuracy;
    if (critRate != "N/A") moveDetail.critRate = critRate;
    if (effect != "N/A") moveDetail.effect = effect;
    if (effectRate != "N/A") moveDetail.effectRate = effectRate;

    // Save move
    const move = new Move(moveDetail);
    await move.save();
    moves[index] = move;
    console.log(`Added move: ${move.name}`);
}

// Populate moves
async function createMoves() {

}
