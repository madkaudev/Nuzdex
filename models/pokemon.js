// Require statements
const mongoose = require("mongoose");

// Declare schema
const Schema = mongoose.Schema;
const PokemonSchema = new Schema({
    gen: { type: Number, required: true },
    name: { type: String, required: true },
    number: [{ type: Number, required: true }],
    type1: { type: String, required: true },
    type2: { type: String, required: true },
    levelRate: { type: String, required: true },
    stats: {
        hp: { type: Number, required: true },
        atk: { type: Number, required: true },
        def: { type: Number, required: true },
        spAtk: { type: Number, required: true },
        spDef: { type: Number, required: true },
        spd: { type: Number, required: true },
    },
    moves: [{ 
        type: Map, 
        of: { type: Schema.Types.ObjectId, ref: "Move" },
        required: true,
    }],
    eggGroup1: { type: String, required: true },
    eggGroup2: { type: String },
    abilities: [{ 
        type: Map,
        of: { type: Schema.Types.ObjectId, ref: "Ability" },
    }],
    evolutions: [{ type: Map }],
    genderRatio: { type: String },
    baseHappiness: { type: Number },
    heldItems: [{ type: Map }],
    evs: {
        hp: { type: Number },
        atk: { type: Number },
        def: { type: Number },
        spAtk: { type: Number },
        spDef: { type: Number },
        spd: { type: Number },
    },
    canSOS: { type: Boolean },
    canDynamax: { type: Boolean },
    canTerra: { type: Boolean },
    locations: [{ type: String }],
});

// Virtual for pokemon's URL
PokemonSchema.virtual("url").get(function (){
    return `/home/pokemon/gen${this.gen}/${this.name}`;
});

// Export model
module.exports = mongoose.model("Pokemon", PokemonSchema);
