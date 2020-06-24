const { Schema, model } = require("mongoose");

const SampleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = new model("Sample", SampleSchema);