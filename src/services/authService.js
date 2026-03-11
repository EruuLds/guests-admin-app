import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, signOut } from "firebase/auth";
import { ref, set } from "firebase/database";
import { database, auth } from "../firebase/firebaseConfig";

export const authService = {

    async signUp(data) {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        const user = userCredential.user;

        const { password, confirmPassword, ...profile } = data;

        await set(
            ref(database, `users/${user.uid}`),
            {
                ...profile,
                email: user.email,
                createdAt: Date.now(),
                role: "admin"
            }
        );

        return user;
    },

    async login(data) {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        return userCredential.user;
    },

    async logout() {
        await signOut(auth);
    }

    /*const async anonymousLogin() {
        try {
            const userCredential = await signInAnonymously(auth);
    
            const user = userCredential.user;
    
            onSuccess?.(user);
        } catch(err) {
            onError?.(err.message)
            console.log(err)
        } finally {
            onComplete?.();
        }
    }*/
};
