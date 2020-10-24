var db = require('../db');

const NEW_SELECT_MSG =
  'SELECT u.username, m.text, m.roomname, date_format(m.created_at,"%Y-%c-%e %r") AS date FROM messages AS m INNER JOIN users AS u ON u.id = m.userId;';

//const SELECT_ALL_MSG = 'SELECT * FROM messages';
const INSERT_MSG = 'INSERT INTO messages SET ?';

const SELECT_ALL_USER = 'SELECT * FROM users';
const INSERT_USER = 'INSERT INTO users SET ?';

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function () {
      return new Promise((resolve, reject) => {
        let res = [];

        db.query(NEW_SELECT_MSG, (err, results) => {
          console.log('---- messages.get() ------------------------');
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(results);

          for (let i = 0; i < results.length; i++) {
            res.push(results[i]);
          }
          console.log(res);
          resolve(res);
        });
      });
    },
    // a function which can be used to insert a message into the database
    post: function (postMsg) {
      return new Promise((resolve, reject) => {
        let sql = 'SELECT id FROM users WHERE username = ?';
        let userId;
        let newPostMSg = {
          text: postMsg.text,
          roomname: postMsg.roomname,
        };
        db.query(sql, postMsg.username, (err, results) => {
          console.log('---- messages.post() 1 ------------------------');
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(results[0].id);
          userId = results[0].id;
          newPostMSg.userId = userId;
        });

        db.query(INSERT_MSG, newPostMSg, (err, results) => {
          console.log('---- messages.post() 2 ------------------------');
          console.log(newPostMSg);
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(results);

          resolve(results.insertId);
        });
      });
    },
  },

  users: {
    // Ditto as above.
    get: function () {
      return new Promise((resolve, reject) => {
        let res = [];
        db.query(SELECT_ALL_USER, (err, results) => {
          console.log('---- users.get() ------------------------');
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(results);

          res.push(results);
          console.log(res);
          resolve(res);
        });
      });
    },
    post: function (postUser) {
      return new Promise((resolve, reject) => {
        db.query(INSERT_USER, postUser, (err, results) => {
          console.log('---- users.post() ------------------------');
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(results);
          resolve(results.insertId);
        });
      });
    },
  },
};
