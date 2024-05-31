#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

// Retrieve models
const Pokemon = require("../models/pokemon");

// Create array for records
const pokemons = [];

// Set up mongoDB connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];
main().catch((err) => console.log(err));
async function main() {
    console.log("Connecting to the database.");
    await mongoose.connect(mongoDB);
    console.log("Creating pokemons.");
    await createPokemons();
    console.log("Closing connection.");
    mongoose.connection.close();
}

// Create a record of a pokemon
async function pokemonCreate(index, gen, number, name, type1, type2, levelRate, stats, moves, eggGroup1, eggGroup2, evolutions, 
    genderRatio, baseHappiness, heldItems, evs, canSOS, canDynamax, canTerra, locations) {
    // Create pokemon instance
    const pokemonDetail = { gen: gen, number: number, name: name, type1: type1, type2: type2, levelRate: levelRate, stats: stats, 
        moves: moves, eggGroup1: eggGroup1 };
    if (eggGroup2 != "N/A") pokemonDetail.eggGroup2 = eggGroup2;
    if (evolutions != "N/A") pokemonDetail.evolutions = evolutions;
    if (genderRatio != "N/A") pokemonDetail.genderRatio = genderRatio;
    if (baseHappiness != "N/A") pokemonDetail.baseHappiness = baseHappiness;
    if (heldItems != "N/A") pokemonDetail.heldItems = heldItems;
    if (evs != "N/A") pokemonDetail.evs = evs;
    if (canSOS != "N/A") pokemonDetail.canSOS = canSOS;
    if (canDynamax != "N/A") pokemonDetail.canDynamax = canDynamax;
    if (canTerra != "N/A") pokemonDetail.canTerra = canTerra;
    if (locations != "N/A") pokemonDetail.locations = locations;

    // Save pokemon
    const pokemon = new Pokemon(pokemonDetail);
    await pokemon.save();
    pokemons[index] = pokemon;
    console.log(`Added pokemon: ${pokemon.name}`);
}

// Populate pokemons
async function createPokemons() {
 
}
