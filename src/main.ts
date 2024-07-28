import './style.css'
import {initializeApp} from "firebase/app";
import {getFirestore, getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"
import {createSearchItem} from "./createSearchItem.ts";

const NAME = 'fdskn'
const COLLECTION_ID = 'bk-searches'

async function initFirebaseApp() {
  const encodedConfig = await window.cookieStore.get(NAME) || ''
  const config = JSON.parse(atob(encodedConfig.value))

  console.log(config)
  return initializeApp(config)
}

async function getSearches() {
  const app = await initFirebaseApp()
  const firestore = getFirestore(app)

  const onDocRemove = (id: string) => {
    deleteDoc(doc(firestore, COLLECTION_ID, id))
  }

  const onDocStop = (id: string) => {
    updateDoc(doc(firestore, COLLECTION_ID, id), {
      active: false
    })
  }

  const onRun = (id: string) => {
    updateDoc(doc(firestore, COLLECTION_ID, id), {
      active: true
    })
  }

  const addForm = document.getElementById('add-form') as HTMLFormElement

  addForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
      await addDoc(collection(firestore, COLLECTION_ID), {
        href: addForm.elements.search.value,
        title: addForm.elements.title.value,
        active: true
      })
    } catch (e) {
      console.error(e)
    }
  })

  try {
    const docs = await getDocs(collection(firestore, COLLECTION_ID))

    docs.forEach(doc => {
      const data = doc.data()
      const { href, title, active } = data
      const id = doc.id

      document.getElementById('app')?.appendChild(createSearchItem({
        id,
        title,
        href,
        active,
        onStop: onDocStop,
        onRemove: onDocRemove,
        onRun
      }))
    })
  } catch (e) {
    console.error(e)
  }

  //document.getElementById('app')?.appendChild(createSearchItem('1', 'Google', 'https://google.com'))
  //document.getElementById('app')?.appendChild(createSearchItem('2', 'Bing', 'https://bing.com'))
  //document.getElementById('app')?.appendChild(createSearchItem('3', 'DuckDuckGo', 'https://duckduckgo.com'))
}




getSearches()
