const mysql = require('mysql2');

// var con = mysql.createConnection({
//   host:"134.209.110.108",
//   user:"digivladev",
//   password:"digivladev@@90",
//   database:"digivla"
// });
//
// con.connect(function(err){
//   if (err) {
//     console.log('error when connecting to db:', err);
//   }
//   console.log("Connected to digivla");
// });
//
// module.exports = con;

var pool = mysql.createPool({
  host:"134.209.110.108",
  user:"digivladev",
  password:"digivladev@@90",
  database:"digivla",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  // connectionLimit: 10,
  // acquireTimeout: 30000, //30 secs
  // acquireTimeout: 1000000
});

pool.getConnection(function(err, connection) {
  if (err) {throw err}; // not connected!
  console.log("Connected to digivla");
});

module.exports = pool;
//
// var getConnection = function (cb) {
//     pool.getConnection(function (err, connection) {
//         //if(err) throw err;
//         //pass the error to the cb instead of throwing it
//         if(err) {
//           return cb(err);
//         }
//         cb(null, connection);
//     });
// };
// module.exports = getConnection;
