//=============================
//Puerto
//=============================

process.env.PORT = process.env.PORT || 3000;

//==================================
//Entorno
//==================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// mongodb: //localhost:27017/cafe
//     mongodb + srv: //strider:8fLQdqJ8sAPWQeXM@cluster0.e6kio.mongodb.net/test

//==================================
//Base de datos
//==================================

let urlDB;
// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe'
// } else {
urlDB = ' mongodb+srv://strider:8fLQdqJ8sAPWQeXM@cluster0.e6kio.mongodb.net/test'
    // }
    // process.env.URlDB = urlDB;