import type { User } from "@/types"
import {create} from "zustand"
import {persist} from "zustand/middleware"

type Store = {
currentUser: User | null
setCurrentUser: (user: User) => void
}


export const useStore = create<Store>()(
    persist((set) => ({
        currentUser: null,
        setCurrentUser: (currentUser) => set({currentUser})

    }), 

{name: "momentstore"})
)

