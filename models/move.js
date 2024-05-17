// Require statements
const mongoose = require("mongoose");

// Declare schema
const Schema = mongoose.Schema;
const MoveSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true, enum: ["Physical", "Special", "Status"] },
    pp: { type: Number, required: true },
    power: { type: Number },
    accuracy: { type: Number },
    critRate: { type: Number },
    description: { type: String, required: true },
    effect: { type: String },
    effectRate: { type: Number },
    priority: {type: Number, required: true },
});

// Virtual for move's URL
MoveSchema.virtual("url").get(function (){
    return `/home/moves/${this.name}`;
});

// Export model
module.exports = mongoose.model("Move", MoveSchema);
