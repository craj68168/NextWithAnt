
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useEffect, useState } from "react";
import { auth } from "../utils/index";

export const AuthContextProvider = () => {
    const [user, setUser] = useState<any>(null)
    console.log("user 12345", user);

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                })
            } else {
                setUser(null)
            }
        })

        return () => unsubscribe()
    }, [])
    console.log("user user", user);

    return {
        user,
        signUp,
        login,
        logout,
    }
}