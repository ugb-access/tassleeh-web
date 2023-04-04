// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
// import { storage } from '../firebase';
// import moment from "moment";

// const getImageURL = (file, dir, onProgress) => {

//     const storageRef = ref(storage, dir || `/files/${file.name}`)
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     return new Promise(resolve => {

//         uploadTask.on("state_changed", (snapshot) => {
//             const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
//             console.log('progress: ', progress);
//             onProgress && onProgress(progress)
//         }, (err) => {
//             console.log(err, "error")
//             return resolve(false)
//         },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref)
//                     .then(res => {
//                         return resolve(res)
//                     })
//             }
//         )
//     })

// }

// export const generateNumber = () => {
//     return Math.floor(Math.random() * (99999 - 10000)) + 10000;
// }

// export function getUnReadCount(array, uid) {

//     return array.filter(item => item.to === uid && item.read === false).length;

// }

// export function returnAgoTime(date) {
//     let time = moment(date).fromNow()
//     if (time.startsWith("in")) {
//         time = time.replace("in", "") + "ago"
//     }

//     return time
// }
// export {
//     getImageURL
// }
