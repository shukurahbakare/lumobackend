const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
    packageName: { type: String, required: true, unique: true },
    packageDescription: { type: String, required: true }, 
    amount: { type: Number, required: true },
    capacity: { type: String, required: true }
    }, 

    { timestamps: true } 
);

module.exports = mongoose.model('Recommendation', RecommendationSchema);

