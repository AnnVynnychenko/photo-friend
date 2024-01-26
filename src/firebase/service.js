import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { addPost } from "../redux/posts/postsSlice";

export const registerDB = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error("utiToBlob failed"));
    };

    xhr.responseType = "blob";

    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};

export const uploadAvatarToServer = async ({ uri, mimeType }) => {
  const uniqueIdUserAvatar = Date.now().toString();
  const fileRef = ref(storage, `userAvatar/${uniqueIdUserAvatar}.${mimeType}`);

  try {
    const blob = await uriToBlob(uri);
    const uploadedFile = await uploadBytes(fileRef, blob);
    const downloadURL = await getDownloadURL(uploadedFile.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error upload avatar to server", error.code, error.message);
    throw error;
  }
};

export const writeDataToFirestore = async (dispatch, newPost, posts) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("No authenticated user.");
      return;
    }

    const docRef = await addDoc(
      collection(db, `users/${user.uid}/posts`),
      newPost
    );
    console.log("Document written with ID: ", docRef.id);

    dispatch(addPost({ posts: [...posts, { id: docRef.id, data: newPost }] }));
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getDataFromFirestore = async () => {
  try {
    const user = auth.currentUser;
    const posts = await getDocs(collection(db, `users/${user.uid}/posts`));
    posts.forEach((doc) => (`${doc.id} =>`, doc.data()));
    return posts.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateLikesInFirestore = async (postId, currentLikes) => {
  try {
    const user = auth.currentUser;
    const postRef = doc(db, `users/${user.uid}/posts`, postId);

    await updateDoc(postRef, {
      likes: currentLikes === 0 ? 1 : 0,
    });
    console.log("document updated");
  } catch (error) {
    console.log(error);
  }
};

export const updateCommentsInFirestore = async (postId, newComment) => {
  try {
    const user = auth.currentUser;

    const postRef = doc(db, `users/${user.uid}/posts`, postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const existingComments = postDoc.data().comments || [];
      const updatedComments = [...existingComments, newComment];

      await updateDoc(postRef, {
        comments: updatedComments,
        commentCount: updatedComments.length,
      });

      console.log("Document updated with new comment");
    } else {
      console.log("Post document not found");
    }
  } catch (error) {
    console.error("Error updating comments in Firestore", error);
  }
};

export const updatePostInFirestore = async (id, imageName, locationText) => {
  try {
    const user = auth.currentUser;

    const postRef = doc(db, `users/${user.uid}/posts`, id);
    await updateDoc(postRef, {
      photoName: imageName,
      userLocation: locationText,
    });
  } catch (error) {}
};

export const deletePostFromFirestore = async (id) => {
  try {
    const user = auth.currentUser;

    const postRef = doc(db, `users/${user.uid}/posts`, id);
    await deleteDoc(postRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
