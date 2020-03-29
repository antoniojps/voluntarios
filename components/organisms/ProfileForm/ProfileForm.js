import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { Input, Spacer, Fieldset, Note } from '@zeit-ui/react'
import { InputLabel } from 'components/atoms'
import { InputPlaces, ProfileSelect } from 'components/molecules'
import { ButtonZeit } from 'components/atoms'

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
  const { handleSubmit, errors, control } = useForm();
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
      <>
        <Note label={false} type="error" small>
          O valor inserido é inválido.
        </Note>
        <Spacer y={0.5} />
      </>
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
        />
        <Spacer y={0.5} />
        {renderError(errors.lastName)}

        <Fieldset.Footer>
          <Fieldset.Footer.Status>
            Por favor utilize 32 caracteres no máximo para cada um dos campos.
          </Fieldset.Footer.Status>
          <Fieldset.Footer.Actions>
            <ButtonZeit
              type="secondary"
              size="small"
              auto
              loading={loading}
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
          <Fieldset.Footer.Status>
            Estas informações apenas serão utilizadas para criar o seu perfil de voluntário.
          </Fieldset.Footer.Status>
          <Fieldset.Footer.Actions>
            <ButtonZeit
              type="secondary"
              size="small"
              auto
              loading={loading}
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
          disabled
        />
        {renderError(errors.email)}

        <Fieldset.Footer>
          <Fieldset.Footer.Status>
            Por favor insira um e-mail válido. Caso contrário poderá não receber oportunidades de voluntariado.
                            </Fieldset.Footer.Status>
          <Fieldset.Footer.Actions>
            <ButtonZeit
              type="secondary"
              size="small"
              auto
              loading={loading}
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