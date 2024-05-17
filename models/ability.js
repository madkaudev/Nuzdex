// Require statements
const mongoose = require("mongoose");

// Declare schema
const Schema = mongoose.Schema;
const AbilitySchema = ({
    name: { type: String, required: true },
    description: { type: String, required: true },
    outsideOfBattle: { type: String },
});

// Virtual for ability's URL
AbilitySchema.virtual("url").get(function (){
    return `/home/abilities/${this.name}`;
});

// Export model
module.exports = mongoose.model("Ability", AbilitySchema);
