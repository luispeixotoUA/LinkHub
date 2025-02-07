const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
  type: { type: String, enum: ['LINK_CLICK', 'PROFILE_VIEW', 'LINK_CREATED', 'LINK_UPDATED'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Metric', MetricSchema);