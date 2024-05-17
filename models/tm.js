// Require statements
const mongoose = require("mongoose");

// Declare schema
const Schema = mongoose.Schema;
const TMSchema = new Schema({
    name: { type: String, required: true },
    move: { type: Schema.Types.ObjectId, ref: "Move", required: true },
    locations: [{ type: String, required: true }],
});

// Virtual for tm's URL
TMSchema.virtual("url").get(function (){
    return `/home/tms/${this.name}`;
});

// Export model
module.exports = mongoose.model("TM", TMSchema);
