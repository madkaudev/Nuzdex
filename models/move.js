// Require statements
const mongoose = require("mongoose");

// Declare schema
const Schema = mongoose.Schema;
const MoveSchema = new Schema({
    generation: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true, enum: ["Physical", "Special", "Status"] },
    pp: { type: Number, required: true },
    power: { type: mongoose.Schema.Types.Mixed },
    accuracy: { type: mongoose.Schema.Types.Mixed },
    description: { type: String, required: true },
    effect: { type: mongoose.Schema.Types.Mixed },
    effectRate: { type: mongoose.Schema.Types.Mixed },
    critRate: { type: mongoose.Schema.Types.Mixed }, 
    priority: {type: Number, required: true },   
    target: { type: String, required: true },
});

// Virtual for move's URL
MoveSchema.virtual("url").get(function (){
    return `/home/moves/gen${this.generation}/${this.name}`;
});

// Export model
module.exports = mongoose.model("Move", MoveSchema);
