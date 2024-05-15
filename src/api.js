// firebase
import { initializeApp } from "firebase/app"
import { getFirestore, 
         collection, 
         getDocs, 
         doc, 
         getDoc, 
         query,
         where 
} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyBl19verLCrjEyAh_FHraoygB97k-T9quw",
    authDomain: "vanlife-75c18.firebaseapp.com",
    projectId: "vanlife-75c18",
    storageBucket: "vanlife-75c18.appspot.com",
    messagingSenderId: "687385248618",
    appId: "1:687385248618:web:ab18e0c7fea24dde015b13",
    measurementId: "G-DW758B2XDC"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    const van = snapshot.data()

    return van
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const hostVans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return hostVans
}

// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}