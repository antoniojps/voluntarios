import React from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Input, Spacer } from '@zeit-ui/react'
import { InputLabel, ButtonZeit } from 'components/atoms'
import messages from 'assets/data/messages.pt'
import './ContactForm.module.scss';
import * as Yup from 'yup'

Yup.setLocale(messages)

const ContactSchema = Yup.object({
    name: Yup.string().required().max(32).min(2),
    email: Yup.string().required().max(32).min(2).email(),
    message: Yup.string().required().min(2),
})

const ContactForm = ({ volunteer, onSubmit, loading = false }) => {
    const { handleSubmit, errors, control, register } = useForm({
        validationSchema: ContactSchema,
    });


    const renderError = (errors) => {
        if (!errors) return null;

        return (
            <div>
                <p className="error">
                    {errors.message}
                </p>
                <style jsx>
                    {`
                p {
                  color: var(--red);
                  margin: 0;
                  font-size: var(--size-xs);
                }
              `}
                </style>
            </div>
        )
    }

    return (
        <form>
            <InputLabel>Nome</InputLabel>
            <Spacer y={0.5} />
            <Controller
                as={Input}
                className='full-width'
                name="name"
                type='text'
                control={control}
                placeholder='Insira o seu nome'
                rules={{ required: true, maxLength: 32 }}
                status={errors.name ? 'error' : ''}
            />
            <Spacer y={0.2} />
            {renderError(errors.name)}
            <Spacer y={1} />

            <InputLabel>Endereço de email</InputLabel>
            <Spacer y={0.5} />
            <Controller
                as={Input}
                className='full-width'
                name="email"
                type='text'
                control={control}
                placeholder='Insira o seu endereço de e-mail'
                rules={{ required: true }}
                status={errors.email ? 'error' : ''}
            />
            <Spacer y={0.2} />
            {renderError(errors.email)}
            <Spacer y={1} />


            <InputLabel>Mensagem</InputLabel>
            <Spacer y={0.5} />

            <textarea
                name="message"
                placeholder={`Insira a sua mensagem. Descreva de forma clara a razão pela qual deseja contactar ${volunteer}.`}
                ref={register({ required: true })}
                className={errors.message ? 'textarea--error' : ''}
            />
            <Spacer y={0.2} />
            {renderError(errors.message)}

            <Spacer y={1} />

            <ButtonZeit
                type="secondary"
                onClick={handleSubmit(onSubmit)}
                loading={loading}
            >
                Contactar {volunteer}
            </ButtonZeit>
        </form>
    )
}

export default ContactForm;