const { admin, db } = require("../../util/admin");
const config = require("../../util/config");

const firebase = require("firebase");
const { request, response } = require("express");

firebase.initializeApp(config);

// Login
exports.loginUser = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((accessToken) => {
      return response.json({ accessToken });
    })
    .catch((error) => {
      console.error(error);

      if (error.code === "auth/wrong-password") {
        return response
          .status(403)
          .json({ error: "Password is incorrect. Try Again" });
      }

      if (error.code === "auth/too-many-requests") {
        return response
          .status(403)
          .json({ error: "Too many login attemps. Try Again Later" });
      }

      if (error.code === "auth/user-not-found") {
        return response.status(403).json({ error: "Account does not exist" });
      } else {
        return response.status(403).json({ error: error.code });
      }
    });
};

exports.signUpUser = (request, response) => {
  const newUser = {
    companyName: request.body.companyName,
    email: request.body.email,
    password: request.body.password,
  };

  let accessToken, userId;

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)

    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      accessToken = idtoken;
      const userCredentials = {
        companyName: newUser.companyName,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return db.doc(`/users/${userId}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ accessToken });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email already in use" });
      } else {
        return response
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};

exports.getUserDetail = (request, response) => {
  let userData = {};
  let idToken;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = request.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return response.status(403).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      request.user = decodedToken;
      return db.doc(`/users/${request.user.uid}`).get();
    })
    .then((doc) => {
      if (doc.exists) {
        userData.userCredentials = doc.data();
        console.log(userData.userCredentials.email);
        return response.json(userData);
      }
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({ error: error.code });
    });
};

exports.resetPassword = (request, response) => {
  firebase
    .auth()
    .sendPasswordResetEmail(request.body.email)
    .then(() => {
      return response.json({
        result: true,
      });
    })
    .catch((error) => {
      onsole.error(error);
      return response.status(500).json({ error: error.code });
    });
};
