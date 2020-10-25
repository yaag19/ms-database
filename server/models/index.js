var db = require('../db');

const NEW_SELECT_MSG =
  'SELECT u.username, m.text, m.roomname, date_format(m.created_at,"%Y-%c-%e %r") AS date FROM messages AS m INNER JOIN users AS u ON u.id = m.userId;';

//const SELECT_ALL_MSG = 'SELECT * FROM messages';
const INSERT_MSG = 'INSERT INTO messages SET ?';

const NEW_SELECT_USER = 'SELECT * FROM users WHERE id = ?';

const INSERT_USER = 'INSERT INTO users SET ?';
let userInfo;
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
      let newPostMsg = {
        text: postMsg.text,
        roomname: postMsg.roomname,
        userId: userInfo,
      };
      return new Promise((resolve, reject) => {
        db.query(INSERT_MSG, newPostMsg, (err, results) => {
          console.log('---- messages.post() ------------------------');

          if (err) reject(err);
          console.log(results);
          resolve(results);
        });
      });
    },
  },

  users: {
    // Ditto as above.
    get: function () {
      return new Promise((resolve, reject) => {
        db.query(NEW_SELECT_USER, [userInfo], (err, results) => {
          console.log('---- users.get() ------------------------');
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(results);

          resolve(results);
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
          // console.log(typeof results.insertId); // number
          userInfo = results.insertId;
          resolve(results.insertId);
        });
      });
    },
  },
};
