import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.config';
const googleProvider = new GoogleAuthProvider()

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState('')

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSign = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserData = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    } 

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('User observed')
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe()
        }
    }, [])


    const authInfo = {
        user,
        createUser,
        googleSign,
        singIn,
        updateUserData,
        logout
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;