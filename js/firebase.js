// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGDpJA3kVhwSU5Oj4ymaJAYz_wePT8IG4",
  authDomain: "blogsite-31901.firebaseapp.com",
  projectId: "blogsite-31901",
  storageBucket: "blogsite-31901.appspot.com",
  messagingSenderId: "789129212245",
  appId: "1:789129212245:web:f06e9c447987b5bb8effdc",
  measurementId: "G-PR7WLP52ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Fungsi untuk menampilkan semua data post
export async function showAllPosts() {
    try {
        const myQuery = await getDocs(collection(db, 'posts'))
        let posts = []
        myQuery.forEach((doc) => {
            posts.push({id: doc.id, ...doc.data()})
        })
        return posts
    } catch(error) {
        console.error('Error data posts: ', error)
        throw error
    }
}

// fungsi untuk menampilkan 1 post
export async function getPostById(postId) {
    try {
        const myQuery =doc(db, 'posts',postId)
        const post = await getDoc(myQuery)
        if (post.exists()) {
            console.log(post.data());
        }

    }catch(error){
        console.error('error data post: ',error)
        throw error
    }
}