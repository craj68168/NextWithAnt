import React, { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth"
import { auth } from "../utils/index";
// const AuthContext = createContext({})

// export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = () => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            user ? setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }) : setUser(null)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])
   
    
    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = async ()=>{
        setUser(null);
       await signOut(auth)
    }
    return {
        signUp,
        login,
        logout,
        user
        // <AuthContext.Provider value={{ user,logout,login,signUp }}>
        //     {loading && children}
        // </AuthContext.Provider>
    }
}