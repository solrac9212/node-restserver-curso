//=============================
//Puerto
//=============================

process.env.PORT = process.env.PORT || 3000;

//==================================
//Entorno
//==================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//==================================
//Vencimiento del token 30 dias
//==================================
process.env.CADUCIDAD_TOKEN = '48h';


//==================================
//seed de autenticacion
//==================================
process.env.SEED = process.env.SEED || "este-es-el-seed-de-desarrollo";


//==================================
//Base de datos
//==================================

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URlDB = urlDB;


//google client


process.env.CLIENT_ID = process.env.CLIENT_ID || "1064591217868-om45uv23lmkhb0lbudubp87t2547ohhf.apps.googleusercontent.com";