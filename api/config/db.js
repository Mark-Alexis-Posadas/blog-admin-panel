const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "my_database",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection.promise();
