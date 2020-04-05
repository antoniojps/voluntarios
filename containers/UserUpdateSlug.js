import React from 'react'
import messages from 'assets/data/messages.pt'
import * as Yup from 'yup'
import { ButtonZeit } from 'components/atoms'
import { Input, Spacer, Fieldset, useToasts } from '@zeit-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { slugRegex } from '../services/contants'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UPDATE_USER_SLUG_MUTATION, CURRENT_USER_QUERY } from '../graphql'
import { useRouter } from 'next/router'
const { DOMAIN } = process.env

Yup.setLocale(messages)

const SlugSchema = Yup.object({
  slug: Yup
    .string()
    .required()
    .matches(slugRegex, "Os nomes de utilizador só podem conter carateres alfanuméricos (A-Z, 0-9) e hífens como seperadores ('-')")
    .max(48)
    .min(5)
    .trim()
    .lowercase(),
})

const UserUpdateSlug = ({ userId = null, initialSlug = 'hey' }) => {
  const client = useApolloClient();
  const [, setToast] = useToasts()
  const [updateSlug, { loading }] = useMutation(UPDATE_USER_SLUG_MUTATION);
  const router = useRouter()

  const { handleSubmit, errors, control } = useForm({
    validationSchema: SlugSchema,
  });

  async function handleSave(newSlug) {
    try {
        await client.resetStore();
        await updateSlug({
            variables: {
            input: {
                slug: newSlug,
              },
              userId,
            },
            update(cache, { data: { updateSlug } }) {
                cache.writeQuery({
                  query: CURRENT_USER_QUERY,
                  data: {currentUser: updateSlug},
                })
              },
        });
        setToast({
          text: 'Nome de utilizador gravado.',
          actions: [{
            name: 'ver perfil',
            handler: () => router.push('/[user]',`/${newSlug}`),
          }],
        })
    } catch (error) {

        setToast({
            text: 'Não foi possível gravar o nome de utilizador. É provável que já tenha sido utilizado, tente outro.',
            type: 'error',
        })
    }
}

  const submit = ({ slug }) => {
    handleSave(slug)
  }

  const renderError = (errors) => {
    if (!errors) return null;

    return (
      <div>
        <p className="error">
          {errors.message}
        </p>
        <Spacer y={1} />
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
    <form onSubmit={handleSubmit(submit)}>
      <Fieldset>
        <Fieldset.Title>Nome de utilizador</Fieldset.Title>
        <Fieldset.Subtitle>O teu nome de utilizador define o teu endereço.</Fieldset.Subtitle>
        <Spacer y={1} />

        <Controller
          as={Input}
          className='full-width'
          name="slug"
          type='text'
          label={`${DOMAIN}/`}
          control={control}
          placeholder='slug'
          defaultValue={initialSlug}
          rules={{ required: true }}
          status={errors.slug ? 'error' : ''}
        />
        {renderError(errors.slug)}

        <Fieldset.Footer>
          <Fieldset.Footer.Status />
          <Fieldset.Footer.Actions>
            <ButtonZeit
              type="secondary"
              size="small"
              disabled={loading}
              auto
            >
              Guardar
            </ButtonZeit>
          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>
    </form>
  )
}

export default UserUpdateSlug
