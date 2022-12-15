const mongoose = require('mongoose');
const mysql = require('mysql2');

async function connect(){
   try {
//     await mongoose.connect('mongodb+srv://hoangmcuong2603:9XBfaRoVLz3e0DvP@cluster0.uhzjwv5.mongodb.net/?retryWrites=true&w=majority');
    await mongoose.connect('mongodb://localhost:27017/blog_nodejs_dev', {
  
    });

    console.log('Connect Successfully!!!!!');
   } catch (error) {
        console.log('Connect failure!!!');
   }

}

//mySql
// const connection = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    database: 'nodejs-blog',
// });

// connection.query(
//    'SELECT * FROM `users`',
//    function(err, results, fields) {
//       console.log('connect mySql');
//      console.log(results); 
//      let rows = results.map((row)=>{return row.id});
//      console.log(results[0]);
//    }
//  );

module.exports = {connect};
// export default connection;