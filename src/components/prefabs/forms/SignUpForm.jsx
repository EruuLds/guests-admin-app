import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/database/useAuth";

export default function LoginForm() {
    const { signUp } = useAuth();
    const formId = 'signUpForm';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: "onTouched" });
    const passwordValue = watch("password") || "";

    const onSubmit = (data) => {
        signUp(data);
    }

    return (
        <div className="grid gap-y-8 py-8">
            <h3 className="text-pretty">Registrarse</h3>

            <form id={formId} className="flex flex-col gap-4" method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col items-start gap-1">
                        <label htmlFor="name" >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ej. María"
                            formNoValidate
                            {...register('name', {
                                required: 'Este campo es requerido',
                                setValueAs: value => value.trim(),
                                validate: (value) => value.length >= 2 || "Ingresa al menos 2 caracteres"
                            })}
                        />
                        {errors.name && <span className='text-xs text-red'>*{errors?.name.message}</span>}
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <label htmlFor="lastName" >Apellido</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Ej. Soto"
                            formNoValidate
                            {...register('lastName', {
                                required: 'Este campo es requerido',
                                setValueAs: value => value.trim()
                            })}
                        />
                        {errors.lastName && <span className='text-xs text-red'>*{errors?.lastName.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col items-start gap-1">
                    <label htmlFor="email" >Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
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
                        placeholder="Crea una contraseña"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            validate: {
                                minLength: v =>
                                    v.length >= 8 || "Debe tener al menos 8 caracteres",
                                upperCase: v =>
                                    /[A-Z]/.test(v) || "Debe contener al menos una mayúscula",
                                lowerCase: v =>
                                    /[a-z]/.test(v) || "Debe contener al menos una minúscula",
                                number: v =>
                                    /\d/.test(v) || "Debe contener al menos un número",
                                noSpaces: v =>
                                    !/\s/.test(v) || "No puede contener espacios"
                            }
                        })}
                    />
                    {errors.password && <span className='text-xs text-red'>*{errors?.password.message}</span>}
                </div>

                <div className="flex flex-col items-start gap-1">
                    <label htmlFor="password" >Confirmar contraseña</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirma tu contraseña"
                        {...register("confirmPassword", {
                            required: "Debes confirmar tu contraseña",
                            validate: value => value === passwordValue || "Las contraseñas no coinciden"
                        })}
                    />
                    {errors.confirmPassword && <span className='text-xs text-red'>*{errors?.confirmPassword.message}</span>}
                </div>

                <div className="text-sm text-start">
                    <p>Tu contraseña debe contener:</p>
                    <ul className="ms-2">
                        <li>
                            - Mínimo 8 caracteres {passwordValue?.length >= 8 && <FontAwesomeIcon icon={faCheckCircle} className="text-green"/>}
                        </li>
                        <li>
                            - Una mayúscula {/[A-Z]/.test(passwordValue) && <FontAwesomeIcon icon={faCheckCircle} className="text-green"/>}
                        </li>
                        <li>
                            - Una minúscula {/[a-z]/.test(passwordValue) && <FontAwesomeIcon icon={faCheckCircle} className="text-green"/>}
                        </li>
                        <li>
                            - Un número {/\d/.test(passwordValue) && <FontAwesomeIcon icon={faCheckCircle} className="text-green"/>}
                        </li>
                    </ul>
                </div>
            </form>

            <div className="text-center">
                <Button variant={'primary'} targetForm={formId} disabled={!isValid} >
                    <FontAwesomeIcon icon={faIdCard} className="me-2" />
                    Registrarse
                </Button>
            </div>
        </div>
    )
}