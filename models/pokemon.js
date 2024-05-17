// Require statements
const mongoose = require("mongoose");

// Declare schema
const Schema = mongoose.Schema;
const PokemonSchema = new Schema({
    gen: { type: Number, required: true },
    number: [{ type: Number, required: true }],
    name: { type: String, required: true },
    type1: { type: String, required: true },
    type2: { type: String, required: true },
    evolutions: [{ type: Map }],
    levelRate: { type: String, required: true },
    genderRatio: { type: String },
    stats: {
        hp: { type: Number, required: true },
        atk: { type: Number, required: true },
        def: { type: Number, required: true },
        spAtk: { type: Number, required: true },
        spDef: { type: Number, required: true },
        spd: { type: Number, required: true },
    },
    evs: {
        hp: { type: Number },
        atk: { type: Number },
        def: { type: Number },
        spAtk: { type: Number },
        spDef: { type: Number },
        spd: { type: Number },
    },
    baseHappiness: { type: Number },
    eggGroup1: { type: String, required: true },
    eggGroup2: { type: String },
    heldItems: [{ type: Map }],
    canSOS: { type: Boolean },
    canDynamax: { type: Boolean },
    canTerra: { type: Boolean },
    locations: [{ type: String }],
    moves: [{ 
        type: Map, 
        of: { type: Schema.Types.ObjectId, ref: "Move" },
        required: true,
    }],
});

// Virtual for pokemon's URL
PokemonSchema.virtual("url").get(function (){
    return `/home/pokemon/gen${this.gen}/${this.name}`
});

// Export model
module.exports = mongoose.model("Pokemon", PokemonSchema);
