// Require statements
const mongoose = require("mongoose");

// Declare schema
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    name: { type: String, required: true },
    effect: { type: String, required: true },
    cost: { type: Number },
    sellPrice: { type: Number, required: true },
    finiteLocations: [{ type: String }],
    infiniteLocations: [{ type: String }],
});

// Virtual for item's URL
ItemSchema.virtual("url").get(function (){
    return `/home/items/${this.name}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
