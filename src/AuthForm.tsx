import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './index.scss';

type FormData = {
    email: string;
    password: string;
};

const AuthForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isValid},  } = useForm<FormData>({mode: "onBlur"});

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Успешная аутентификация');
        } else {
            alert('Ошибка аутентификации');
        }
        reset()
    };

    return (
        <div className="auth-form">
            <h2>Аутентификация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email:
                    <input
                        {...register("email",{
                            required: 'Это поле обязательное',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Неверный адрес электронной почты"
                            }
                        })}
                        type="email"
                    />
                    {errors?.email && <span className="error">{errors?.email?.message}</span>}
                </label>


                <label>
                    Пароль:
                    <input
                        {...register("password",{
                            required: 'Это поле обязательное',
                            minLength: {
                                value: 8,
                                message: "Должно быть 8 символов",
                            },
                            validate: (value) => {
                                return (
                                    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                        pattern.test(value)
                                    ) || "Пароль должен содержать нижние, верхние, числовые и специальные символы"
                                );
                            },
                        })}
                        type="password"
                    />
                    {errors?.password && <span className="error">{errors?.password?.message}</span>}
                </label>

                <input className={'btn'} disabled={!isValid} type="submit" />
            </form>
        </div>
    );
};

export default AuthForm;
