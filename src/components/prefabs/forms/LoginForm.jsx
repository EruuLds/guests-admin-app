import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/database/useAuth";
import { useDataContext } from "../../../hooks/contexts/useDataContext";
import { useEffect } from "react";

export default function LoginForm() {
    const params = new URLSearchParams(window.location.search);
    const urlProvidedEmail = params.get("email");
    const urlProvidedPass = params.get("pass");

    const { error, setError } = useDataContext();
    const { login } = useAuth();
    const formId = 'loginForm';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: urlProvidedEmail ?? undefined,
            password: urlProvidedPass ?? undefined
        }
    });

    const onSubmit = (data) => {
        login(data);
    }

    return (
        <div className="grid gap-y-8 py-8">
            <h3 className="text-pretty">Iniciar sesión</h3>

            <form id={formId} className="flex flex-col gap-2" method="post" onSubmit={handleSubmit(onSubmit)}>
                {error &&
                    <div className="panel-b">
                        <p className="text-red">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            {error.code === "auth/invalid-credential"
                                ? 'Correo o contraseña incorrectos'
                                : 'Ocurrió un error inesperado al iniciar sesión, inténtalo nuevamente'
                            }
                        </p>
                    </div>
                }

                <div className="flex flex-col items-start gap-1">
                    <label htmlFor="email" >Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Escribe tu correo"
                        formNoValidate
                        {...register('email', {
                            required: 'El correo electrónico es requerido',
                            setValueAs: value => value.trim(),
                            validate: (value) => emailRegex.test(value) || "Ingresa un correo válido"
                        })}
                    />
                    {errors.email && <span className='text-xs text-red'>*{errors?.email.message}</span>}
                </div>

                <div className="flex flex-col items-start gap-1">
                    <label htmlFor="password" >Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Escribe tu contraseña"
                        {...register('password', {
                            required: 'Escribe tu contraseña',
                        })}
                    />
                    {errors.password && <span className='text-xs text-red'>*{errors?.password.message}</span>}
                </div>
            </form>

            <div className="text-center">
                <Button variant={'primary'} targetForm={formId} >
                    <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" />
                    Iniciar Sesión
                </Button>
            </div>
            {/*(eventId && !loading && !guests) && <span className='flex text-sm mb-2 items-center'>El correo o la contraseña no son válidos.</span>*/}
        </div>
    )
}