var express = require('express');
var mysql = require('mysql')
var router = express.Router();
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'games'
});
connection.connect();


router.post('/addgame', function(req, res, next) {
  
  let insertQuery=`
  INSERT INTO games (game,pname,pnumber ) 
  VALUES ('${req.body.game }',  '${req.body.pname}', '${req.body.pnumber}' )
  ` 

  connection.query(insertQuery, (err, data)=>
  {
      if(err) throw err;
      res.redirect("/allgames");
  }); 

   
});

router.get('/allgames', function(req, res, next) {

  connection.query('SELECT * FROM games', (err, data)=>
  {
      if(err) throw err;

      let htmlRes=`<table border="1" >`; 
      data.forEach(thegame => {
          htmlRes+= `<tr class="mytable"> 
          <td>${thegame.ID}</td> 
          <td>${thegame.game}</td> 
          <td>${thegame.pname}</td>
          <td>${thegame.pnumber}</td>

          <td> <a href="/deletegame/${thegame.ID}"  >Delete</a></td>
          </tr> 
 
          `
      }); 
      htmlRes+= `</table>`; 

     // res.json(data);
      res.send(htmlRes);
  });

});

router.get('/deletegame/:id', function(req, res, next){  
  var deld = parseInt(req.params.id);
  var sql = `DELETE FROM games WHERE ID = ${deld}`;  
  connection.query(sql, function (err, result) {  
  if (err) throw err;  
  console.log("Number of records deleted: " + result.affectedRows);  
  res.redirect('/allgames')
  });  
  }); 

// router.post('/deletegame', function(req, res, next) {
  
//  let gameID = parseInt(req.body.id);
// console.log(gameID)
//  connection.query('DELETE * FROM games WHERE ID ='+ gameID, (err, data)=>
//   {
//       if(err) throw err;


//   });
// res.send(gameID);
   
// });

// router.delete('/deletegame', function(req, res, next) {
//   var game = { id: req.params.id }
  
//   req.getConnection(function(error, conn) {
//     connection.query('DELETE * FROM games WHERE id = ' + req.params.id, game, function(err, result) {
//           //if(err) throw err
//           if (err) {
//               req.flash('error', err)
//               // redirect to allgames list page
//               res.redirect('/allgames')
//           } else {
//               req.flash('success', 'Game deleted successfully! id = ' + req.params.id)
//               // redirect to allgames list page
//               res.redirect('/allgames')
//           }
//       })
//   })
// })


// router.get('/createtable', function (req, res, next) { 
//   //connect to  SQL DB 
  
//   var createTableQuery = `
//  CREATE TABLE games (
//   ID int NOT NULL AUTO_INCREMENT,
//   game varchar(200) NOT NULL,
//   pname varchar(200) NOT NULL,
//   pnumber int NOT NULL,
//   PRIMARY KEY (ID)
//   ); 
// `;

//   //create db query
//   connection.query(createTableQuery, (err, data) => {
//       if (err) throw err;
//       console.log("table created!");
//       res.send("OK! table created!");
//   });

// });


module.exports = router;
