const functions = require("firebase-functions");

const app = require("express")();

const FBAuth =require('./util/fbAuth');

const { 
    getAllScreams, 
    postOneScream,
    getScream,
    commentOnScream,
    likeScream,
    unlikeScream,
    deleteScream
} = require("./handlers/screams");

const { 
    signup, 
    login, 
    uploadImage,
    addUserDetails,
    getAuthenticatedUser
} = require("./handlers/users");

// screams route
app.get("/screams", getAllScreams);
// Post one scream
app.post("/scream", FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', FBAuth, deleteScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

//user route
//Signup route
app.post("/signup", signup);
//Login route
app.post("/login", login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.region("asia-southeast2").https.onRequest(app);
