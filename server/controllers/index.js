var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: async function (req, res) {
      const messages = await models.messages.get();
      console.log('>> controller - messages.get()');
      console.log(messages);

      await res.status(200).send(messages);
    },
    // a function which handles posting a message to the database
    post: async function (req, res) {
      console.log('>> controller - messages.post()');
      console.log(req.body);
      await models.messages.post(req.body);
      await res.status(200).send(req.body);

      //res.status(201).send('Insert message!');
    },
  },

  users: {
    // a function which handles a get request for all users
    get: async function (req, res) {
      const users = await models.users.get();
      console.log('>> controller - users.get()');
      console.log(users);
      await res.status(200).send(users);
    },
    // a function which handles posting a user to the database
    post: async function (req, res) {
      console.log('>> controller - users.post()');
      console.log(req.body);

      let insertId = await models.users.post(req.body);
      console.log(insertId);
      try {
        if (insertId) {
          await res.status(201).send(req.body);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
