import LoginForm from "../components/prefabs/forms/LoginForm";
import SignUpForm from "../components/prefabs/forms/SignUpForm";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { Navigate } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import DialogManager from "../components/component-managers/DialogManager";

export default function Auth() {
    const { user, event, loading, initialLoading } = useContext(DataContext);
    const isMobile = useMediaQuery("(max-width: 640px)");

    const loginRef = useRef(null);
    const registerRef = useRef(null);

    const [isRegistering, setIsRegistering] = useState(false);
    const [height, setHeight] = useState(0);

    const activeRef = isRegistering ? registerRef : loginRef;

    useLayoutEffect(() => {
        if (!activeRef.current) return;

        const observer = new ResizeObserver(() => {
            setHeight(activeRef?.current.scrollHeight);
        });

        observer.observe(activeRef?.current);

        return () => observer.disconnect();
    }, [isRegistering, isMobile, loading, initialLoading]);

    if(initialLoading) {
        return(
            <div className="relative h-dvh w-full">
                <LoadingOverlay text={'Cargando...'} />
            </div>
        )
    }

    if (!(user && event)) {
        return (
            <>
                <div className="responsive-container min-h-svh py-12 flex flex-col justify-center items-center">
                    <img
                        className="w-full max-w-[12rem] mb-12"
                        src="/img/invitex-logo.svg"
                        alt="Invitex logo"
                    />

                    <div className="relative w-full max-w-[30rem] bg-white panel-shadow rounded-3xl p-4 text-center overflow-hidden">

                        <div
                            className="relative transition-all duration-300"
                            style={{ height }}
                        >

                            <div
                                ref={loginRef}
                                className={`absolute w-full transition-all duration-300 ${
                                    isRegistering
                                        ? "opacity-0 -translate-x-6 pointer-events-none"
                                        : "opacity-100 translate-x-0"
                                }`}
                            >
                                <LoginForm />

                                <p className="text-sm mt-2">
                                    ¿No tienes una cuenta?{" "}
                                    <span
                                        className="text-button cursor-pointer"
                                        onClick={() => setIsRegistering(true)}
                                    >
                                        Regístrate
                                    </span>
                                </p>
                            </div>

                            <div
                                ref={registerRef}
                                className={`absolute w-full transition-all duration-300 ${
                                    isRegistering
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 translate-x-6 pointer-events-none"
                                }`}
                            >
                                <SignUpForm />

                                <p className="text-sm mt-2">
                                    ¿Ya tienes una cuenta?{" "}
                                    <span
                                        className="text-button cursor-pointer"
                                        onClick={() => setIsRegistering(false)}
                                    >
                                        Inicia sesión
                                    </span>
                                </p>
                            </div>
                        </div>
                        {loading && <LoadingOverlay text={`${isRegistering ? 'Creando cuenta...' : 'Iniciando sesión...'}`}/>}
                    </div>
                </div>

                <DialogManager/>
            </>
        );
    }
    
    if(!event)
        return <Navigate to="/dashboard" />;
    else
        return <Navigate to="/dashboard" />;
}