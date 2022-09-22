import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

import { getDatabase, ref, set, child, get, update } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDLefSpOKgzQ0e-9uTZo4zumZeJkUdFqJc",
  authDomain: "forum-app-3128a.firebaseapp.com",
  projectId: "forum-app-3128a",
  storageBucket: "forum-app-3128a.appspot.com",
  messagingSenderId: "787492908828",
  appId: "1:787492908828:web:08857b3d232b49b0c794d9",

  databaseURL: "https://forum-app-3128a-default-rtdb.firebaseio.com/",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = async () => {
  return await signInWithPopup(auth, provider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, displayName) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error when create an account", error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const downloadProfileFromDatabase = async (user, setProfile) => {
  if (user) {
    const dbRef = ref(getDatabase());

    await get(child(dbRef, `users/${user.uid}/userProfile`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          const { userProfile } = val;
          setProfile(userProfile);

          return true;
        }
      }
    );
    return false;
  }
};

export const uploadProfileToDatabase = (userId, userProfile) => {
  const db = getDatabase();

  set(ref(db, "users/" + userId + "/userProfile"), {
    userProfile: userProfile,
  });
};

export const updateProfileToDatabase = async (userId, userProfile) => {
  const db = getDatabase();

  await update(ref(db, "users/" + userId + "/userProfile"), {
    userProfile: userProfile,
  });
};

// export const addNewRoomToDatabase = async (newRoom, roomId) => {

//   await setDoc(doc(db, "channels", "rooms"), newRoom, { merge: true });
// };
export const addNewRoomToDatabase = async (newRoom, roomId) => {
  await setDoc(doc(db, "channels", "rooms"), newRoom, { merge: true });
};

export const addNewRoomToUserChannel = async (newRoom, uid) => {
  await setDoc(doc(db, "userChannels", uid), newRoom, { merge: true });
};

export const addNewMessageToDatabase = async (newMessage, roomId) => {
  const id = newMessage.messageId;
  await setDoc(
    doc(db, "messages", roomId),
    { [id]: newMessage },
    { merge: true }
  );
};

export const addNewReplyToDatabase = async (newReply, mid) => {
  const id = newReply.messageId;
  await setDoc(
    doc(db, "replies", mid),

    { [id]: newReply },
    { merge: true }
  );
};
export const addReservedWordToDatabase = async (word) => {
  await setDoc(
    doc(db, "reservedWord", "words"),
    { [word]: word },
    { merge: true }
  );
};
export const addDMtoDatabase = async (newDM, suid, ruid) => {
  await setDoc(doc(db, "friends", suid), { [ruid]: newDM }, { merge: true });
  //await setDoc(doc(db, "friends", ruid), { [suid]: newDM }, { merge: true });
};

export const addNewDirectMessageToDatabase = async (dm, DMId) => {
  await setDoc(
    doc(db, "directMessages", DMId),
    { [dm.messageId]: dm },
    { merge: true }
  );
};
