const mongoose = require('mongoose');

const database = mongoose.connection;

database.on('error', (error) => {
  console.log('❌ Error:', error)
})

database.once('connected', () => {
  console.log('✅ Database Connected');
})

mongoose.connect('mongodb://localhost:27017/linkhub_db')
  .then(() => console.log('🎯 MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

module.exports = mongoose;