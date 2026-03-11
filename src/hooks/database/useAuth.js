import { useDataContext } from "../contexts/useDataContext";
import { authService } from "../../services/authService";
import { useEffect } from "react";

export function useAuth() {
    const { setError, setLoading, setUser } = useDataContext();
    useEffect(() => {
        return setError(null);
    }, [])

    const signUp = async (data) => {
        setLoading(true);

        try {
            const user = await authService.signUp(data);
            setUser(user);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (data) => {
        setLoading(true);

        try {
            const user = await authService.login(data);
            setUser(user);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);

        try {
            await authService.logout();
            setUser(null);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    /*const anonymousLogin = async () => {
        setLoading(true);
        try {
            const userCredential = await signInAnonymously(auth);

            const user = userCredential.user;

            setUser(user);
        } catch(err) {
            setError(err.message);
            openDialog("error", err.message);
            console.log(err)
        } finally {
            setLoading(false);
        }
    }*/

    return { signUp, login, logout };
}