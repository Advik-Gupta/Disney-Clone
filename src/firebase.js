import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyDGv9sWFdPyw29VvoElgONVOrvsW6Ek3uo',
	authDomain: 'disney-plus-clone-62db6.firebaseapp.com',
	projectId: 'disney-plus-clone-62db6',
	storageBucket: 'disney-plus-clone-62db6.appspot.com',
	messagingSenderId: '447105719701',
	appId: '1:447105719701:web:c9b1fdac8afbe740d3ea9c',
	measurementId: 'G-CMN0BK2MGZ'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
