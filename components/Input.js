import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    PhotographIcon,
    XIcon
} from '@heroicons/react/solid'
import { Picker } from 'emoji-mart'
import { useRef, useState } from 'react'
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc
} from '@firebase/firestore'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'
import { db, storage, } from '../firebase'

function Input() {
    const [input, setInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmoji, setShowEmoji] = useState(false)
    const filePickerRef = useRef(null)
    const [loading, setLoading] = useState(false)

    const openEmojiPicker = (e) => {
        let xx = filePickerRef//.current.click(e)
        console.log('e', e);
        console.log('xx', xx);
    }

    const sendPost = async () => {
        if (loading) return
        setLoading(true)

        // return false
        const docRef = await addDoc(collection(db, 'posts'), {
            // id: session.user.uid,
            // username: session.user.name,
            // userImg: session.user.image,
            // tag: session.user.tag,
            text: input,
            timstamp: serverTimestamp(),
        });
        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
                const donwloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: donwloadURL,
                })
            })
        }

        setLoading(false)
        setInput('')
        setSelectedFile(null)
        setShowEmoji(false)
    }

    const addEmoji = () => {
        let sym = e.unified.split("-")
        let codesArray = []

        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray)
        setInput(input + emoji)
    }

    const addImageToPost = (e) => {
        console.log('masuk addImageToPost ');

        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    return (
        <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll ${loading && "opacity-60"}`}>
            <img
                alt=""
                src="https://pbs.twimg.com/profile_images/1004411023527276544/15aa3PpD_400x400.jpg"
                className="h-11 rounded-full cursor-pointer"
            />
            <div className="w-full divide-y divide-gray-700">
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        name=""
                        id=""
                        cols="30"
                        rows="2" className='bg-transparent outline-none  text-lg min-h-[50px] placeholder-gray-500 tracking-wide w-full'
                        placeholder="what is in your mind"
                    />

                    {selectedFile && (
                        <div className='relative'>
                            <div
                                className='absolute w-8 h-8 bg-[#15181c] hover:bg[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                                onClick={() => setSelectedFile(null)}
                            >
                                <XIcon className='text-white h-5' />
                            </div>
                            <img
                                src={selectedFile}
                                alt=""
                                className='max-h-80 object-contain rounded-2xl'
                            />
                        </div>
                    )}
                </div>

                {!loading && (

                    <div className='flex items-center justify-between pt-2.5'>
                        <div className='flex items-center'>
                            <div
                                className='icon'
                                onClick={(e) => {
                                    filePickerRef.current.click(e)
                                }}
                            >
                                <PhotographIcon className='h-[22px] text-[#1d9bf0]' />
                                <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
                            </div>
                            <div className='icon'>
                                <ChartBarIcon className='h-[22px] text-[#1d9bf0]' />
                            </div>
                            <div className='icon' onClick={() => setShowEmoji(!showEmoji)}>
                                <EmojiHappyIcon className='h-[22px] text-[#1d9bf0]' />
                            </div>
                            <div className='icon'>
                                <CalendarIcon className='h-[22px] text-[#1d9bf0]' />
                            </div>

                            {showEmoji && (
                                <Picker
                                    theme='dark'
                                    onSelect={addEmoji}
                                    style={{
                                        backgroundColor: 'red',
                                        position: "absolute",
                                        marginTop: "465px",
                                        marginLeft: -40,
                                        // maxWidth: "200",
                                        maxWidth: "320px",
                                        borderRadius: "20px"
                                    }}
                                />
                            )}
                        </div>

                        <button
                            className="bg-[#1d9bf0] rounded-full hover:bg-[#1a8cd8] text-white px-4 py-1.5 font-bold shadow-md disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                            onClick={() => sendPost()}
                            disabled={!input.trim() && !selectedFile}
                        >
                            Tweet
                        </button>
                    </div>
                )}

            </div>
        </div >
    )
}

export default Input
