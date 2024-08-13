"use client";

import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";

import React, { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {addDoc, collection, getFirestore, serverTimestamp, Timestamp} from 'firebase/firestore'

export default function Input() {
  const imagePickRef = useRef()
  const [imageFileUrl,setImageFileUrl] = useState(null)
  const  [selectedFile , setSelectedFile] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const[text, setText] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const db = getFirestore(app)
  const { data: session } = useSession();
  const addImageToPost = (e)=>{
      const file = e.target.files[0];
      if(file){
        setSelectedFile(file);
        setImageFileUrl(URL.createObjectURL(file))
        
      }
  }

  useEffect(()=>{
      if(selectedFile){
        uploadImageToStorage()
      }
  },[selectedFile])

  const uploadImageToStorage =()=>{
    setImageFileUploading(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, selectedFile)
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('upload is '+ progress +'%done');
      },
      (error)=>{
        console.log(error);
        setImageFileUploading(false)
        setImageFileUrl(null)
        setSelectedFile(null) 
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL)
          setImageFileUploading(false)
        })
      }
    )
  }

  const handleSubmit = async () =>{
    setPostLoading(true)
    const docRef = await addDoc(collection(db, 'posts'),{
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      text: text,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
      image: imageFileUrl
    })
    setPostLoading(false);
    setText('')
    setImageFileUrl(null)
    setSelectedFile(null)
  }


  if (!session) return null;
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img
        src={session.user.image}
        alt="user img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-90"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          placeholder="Whats happening"
          rows="2"
          className="w-full border-none outline-none p-3 tracking-wide min-h-[50px] text-gray-700"
          value = {text}
          onChange={(e)=>setText(e.target.value)}
        />
        {
          selectedFile && (
            <img src={imageFileUrl} alt="image Url" className={`max-h-[250px] w-full object-cover cursor-pointer ${imageFileUploading ? 'animate-pulse' : '' }` }/>
          )
        }
        <div className="flex items-center justify-between p-2.5">
          <HiOutlinePhotograph 
          onClick={()=>imagePickRef.current.click()}
          className="rounded-full cursor-ponter h-10 w-10 p-2 text-sky-500 hover:bg-sky-100" />
          <input hidden type="file" ref={imagePickRef} accept= 'image/*' onChange={addImageToPost}/>
          <button 
            disabled = {text.trim() === '' || postLoading || imageFileUploading}
            onClick = {handleSubmit}
            className="bg-blue-400 rounded-full px-4 py-1.5 font-bold shadow-md text-white border cursor-pointer opacity-95 hover:opacity-80 disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
