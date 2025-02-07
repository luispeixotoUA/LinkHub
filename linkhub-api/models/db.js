const mongoose = require('mongoose');

const MONGO_URI = "mongodb://admin:secret@mongodb:27017/linkhub?authSource=admin";


const connectWithRetry = () => {
  console.log("🟡 Tentando conectar ao MongoDB...");

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("✅ Conectado ao MongoDB com sucesso!");
  }).catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    console.log("🔁 Tentando novamente em 5 segundos...");
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

module.exports = mongoose;