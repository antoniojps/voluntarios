import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Input, Spacer, Fieldset } from '@zeit-ui/react'
import { InputLabel } from 'components/atoms'
import { InputPlaces, ProfileSelect } from 'components/molecules'
import { ButtonZeit } from 'components/atoms'
import messages from 'assets/data/messages.pt'
import * as Yup from 'yup'

Yup.setLocale(messages)

const ProfileSchema = Yup.object({
  firstName: Yup.string().required().max(32).min(2),
  lastName: Yup.string().required().max(32).min(2),
  job: Yup.string().notRequired().max(48).min(2),
  locations: Yup.array().of(Yup.object({
    name: Yup.string().required(),
    geolocation: Yup.object({
      lat: Yup.number().required(),
      long: Yup.number().required(),
    }),
  }).notRequired()).notRequired(),
  categories: Yup.array().of(Yup.number()).notRequired(),
})

const ProfileForm = ({
  firstName,
  lastName,
  job,
  locations,
  email,
  categories,
  loading = false,
  onSubmit,
}) => {
  const { handleSubmit, errors, control } = useForm({
    validationSchema: ProfileSchema,
  });
  const [locationsData, setLocationsData] = useState(locations);
  const [categoriesData, setCategoriesData] = useState(categories);

  const submit = data => {
    onSubmit({ ...data, locations: locationsData, categories: categoriesData })
  }

  function handleChangePlaces(newLocations) {
    if (newLocations) setLocationsData(newLocations)
    else setLocationsData([])
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
        <Fieldset.Title>Informações pessoais</Fieldset.Title>
        <Fieldset.Subtitle>Por favor introduza o seu primeiro e último nome.</Fieldset.Subtitle>
        <Spacer y={1} />

        <Controller
          as={Input}
          className='full-width'
          name="firstName"
          type='text'
          control={control}
          placeholder='Primeiro nome'
          defaultValue={firstName}
          rules={{ required: true, maxLength: 32 }}
          status={errors.firstName ? 'error' : ''}
        />
        <Spacer y={0.5} />
        {renderError(errors.firstName)}

        <Controller
          as={Input}
          className='full-width'
          name="lastName"
          type='text'
          control={control}
          placeholder='Sobrenome'
          defaultValue={lastName}
          rules={{ required: true, maxLength: 32 }}
          status={errors.lastName ? 'error' : ''}
        />
        <Spacer y={0.5} />
        {renderError(errors.lastName)}

        <Fieldset.Footer>
          <Fieldset.Footer.Status />
          <Fieldset.Footer.Actions>
            <ButtonZeit
              type="secondary"
              size="small"
              auto
              disabled={loading}
            >
              Guardar
            </ButtonZeit>
          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>


      <Spacer y={1} />

      <Fieldset>
        <Fieldset.Title>Detalhes do voluntário</Fieldset.Title>
        <Fieldset.Subtitle>Informação acerca da sua experiência, áreas de atuação e interesse.</Fieldset.Subtitle>

        <Spacer y={1.5} />

        <InputLabel>Profissão / Ocupação</InputLabel>
        <Spacer y={0.5} />

        <Controller
          as={Input}
          className='full-width'
          name="job"
          type='text'
          control={control}
          placeholder='Insira a sua profissão ou ocupação'
          defaultValue={job}
          rules={{ required: true, maxLength: 32 }}
          status={errors.job ? 'error' : ''}
        />
        <Spacer y={0.5} />
        {renderError(errors.job)}

        <InputLabel>Localização(s)</InputLabel>
        <Spacer y={0.5} />

        <InputPlaces
          className='full-width'
          initialValue={locations}
          onChange={handleChangePlaces}
        />

        <Spacer y={1} />

        <InputLabel>Competências / Áreas de interesse</InputLabel>
        <Spacer y={0.5} />

        <ProfileSelect
          categories={categoriesData}
          handleChange={setCategoriesData}
        />
        <Spacer y={.5} />

        <Fieldset.Footer>
          <Fieldset.Footer.Status />
          <Fieldset.Footer.Actions>
            <ButtonZeit
              type="secondary"
              size="small"
              auto
              disabled={loading}
            >
              Guardar
            </ButtonZeit>

          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>

      <Spacer y={1} />

      <Fieldset>
        <Fieldset.Title>Endereço de e-mail</Fieldset.Title>
        <Fieldset.Subtitle>Por favor introduza o seu e-mail.</Fieldset.Subtitle>
        <Spacer y={1} />

        <Controller
          as={Input}
          className='full-width'
          name="email"
          type='email'
          control={control}
          placeholder='Por favor introduza o seu e-mail.'
          defaultValue={email}
          rules={{ required: true, email: true }}
          status={errors.email ? 'error' : ''}
          disabled
        />
        {renderError(errors.email)}

        <Fieldset.Footer>
          <Fieldset.Footer.Status>
            <span role="img" aria-label="work in progress emoji">🚧</span>
            <Spacer x={0.5} />
            Em desenvolvimento.
          </Fieldset.Footer.Status>
          <Fieldset.Footer.Actions>
            <ButtonZeit
              type="secondary"
              size="small"
              auto
              disabled
            >
              Guardar
            </ButtonZeit>
          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>
    </form>
  )
}

export default ProfileForm;