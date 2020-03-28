import { useState } from 'react'
import { useSetState } from 'react-use'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { CATEGORIES_QUERY, UPDATE_USER_MUTATION } from '../graphql'
import { Layout, Avatar, ButtonZeit } from 'components/atoms'
import { Select, InputPlaces } from 'components/molecules'
import { withAuth } from 'utils/auth';
import { Input, Spacer, Fieldset, Note } from '@zeit-ui/react'
import { withApollo } from '../apollo/client';
import InputLabel from '../components/atoms/Label/InputLabel'
import { fetchGeoLocation } from '../services/places';

const Profile = ({ user = { firstName: null, lastName: null, email: null, job: null, categories: [], locations: [1] } }) => {
    // Nao ler este componente. Perigo de apanhar corona virus.
    const [personalFields] = useState([
        {
            name: 'firstName',
            placeholder: 'Primeiro nome',
            type: 'text',
        },
        {
            name: 'lastName',
            placeholder: 'Sobrenome',
            type: 'text',
        },
    ])
    const [volunteerDetailsFields] = useState([
        {
            label: 'Profissão/Ocupação',
            placeholder: 'Insira a sua profissão ou ocupação',
            name: 'job',
            type: 'text',
        },
        {
            label: 'Localização',
            name: 'locations',
            type: 'locations',
        },
        {
            label: 'Competências / Áreas de interesse',
            name: 'categories',
            type: 'categories',
        },
    ])
    const [privacyFields] = useState([
        {
            name: 'email',
            label: 'email',
            placeholder: 'Por favor introduza o seu e-mail.',
            type: 'text',
        },
    ])
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const [state, setState] = useSetState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        job: user.job,
        categories: user.categories,
        description: '',
        locations: user.locations[0],
    });

    const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    const client = useApolloClient();

    function renderSelect() {
        const { data, loading, error } = useQuery(CATEGORIES_QUERY);
        if (error) return <Note label={false} type="error" style={{ height: 'fit-content' }}>Ocorreu um erro.</Note>

        const addCategory = categories => {
            setState({
                categories,
            })
        }

        const options = data && data.allCategories.length > 0 ? data.allCategories.map((category) => ({
            value: category._id,
            label: category.name,
            color: category.color,
        })) : []

        const defaultValue = state.categories.map((category) => ({
            value: category._id,
            label: category.name,
            color: category.color,
        }))

        return (
            <Select
                placeholder="Selecione áreas de interesse."
                options={options}
                onChange={addCategory}
                isLoading={loading}
                isDisabled={loading}
                value={state.categories}
                defaultValue={defaultValue}
                isMulti
            />
        )
    }

    async function handleSave(e) {
        e.preventDefault();
        setSubmitError(false);
        setLoadingSubmit(true);
        let latitude = user.locations[0].geolocation.latitude;
        let longitude = user.locations[0].geolocation.longitude;

        const geo = await fetchGeoLocation(state.locations._id);
        if (!geo || !geo.results || geo.results.length === 0) {
            setLoadingSubmit(false);
            return setSubmitError(true);
        } else {
            const { geolocation: { lat, lng } } = geo.results;
            latitude = lat,
                longitude = lng;
        }

        const formState = {
            input: {
                ...state,
                _id: user._id,
                email: user.email,
                locations: {
                    name: state.locations.name,
                    geolocation: {
                        lat: latitude,
                        long: longitude,
                    },
                },
                categories: state.categories.map(cat => (cat._id)),
            },
        }

        try {
            await client.resetStore();
            await updateUser({
                variables: formState,
            });
            setLoadingSubmit(false);
        } catch (error) {
            setSubmitError(true);
            setLoadingSubmit(false);
        }
    }

    function handleChangePlaces({ value, label }) {
        setState({
            locations: {
                ...state.locations,
                _id: value,
                name: label,
            },
        })
    }

    function handleInputChange(e, input) {
        if (input.type === 'text') {
            setState({ [input.name]: e.target.value })
        }
    }

    return (
        <Layout title={`${state.firstName} ${state.lastName}`} description={<Description />}>
            <div className="container">
                <div className="row flex-column justify-content-md-center">
                    {submitError && (
                        <>
                            <Note label={false} type="error" style={{ height: 'fit-content' }}>Pedimos desculpa. Ocorreu um erro a atualizar os seus dados.</Note>
                            <Spacer y={1} />
                        </>
                    )}
                    <Fieldset>
                        <Fieldset.Title>Informações pessoais</Fieldset.Title>
                        <Fieldset.Subtitle>Por favor introduza o seu primeiro e último nome.</Fieldset.Subtitle>
                        <Spacer y={1} />
                        {personalFields.map(input => (
                            <>
                                {input.label && (
                                    <>
                                        <InputLabel>{input.label}</InputLabel>
                                        <Spacer y={0.5} />
                                    </>
                                )}
                                <Input
                                    className='full-width'
                                    placeholder={input.placeholder}
                                    value={state[input.name]}
                                    onChange={e => handleInputChange(e, input)}
                                />
                                <Spacer y={0.5} />
                            </>
                        ))}
                        <Fieldset.Footer>
                            <Fieldset.Footer.Status>
                                Por favor utilize 32 caracteres no máximo para cada um dos campos.
                            </Fieldset.Footer.Status>
                            <Fieldset.Footer.Actions>
                                <ButtonZeit
                                    type="secondary"
                                    size="small"
                                    auto
                                    loading={loadingSubmit}
                                    onClick={handleSave}
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
                        {volunteerDetailsFields.map(input => {
                            if (input.type === 'text') {
                                return (
                                    <>
                                        {input.label && (
                                            <>
                                                <InputLabel>{input.label}</InputLabel>
                                                <Spacer y={0.5} />
                                            </>
                                        )}

                                        <Input
                                            className='full-width'
                                            placeholder={input.placeholder}
                                            value={state[input.name]}
                                            onChange={e => handleInputChange(e, input)}
                                        />
                                        <Spacer y={1} />
                                    </>
                                )
                            }

                            if (input.type === 'locations') {
                                return (
                                    <>
                                        {input.label && (
                                            <>
                                                <InputLabel>{input.label}</InputLabel>
                                                <Spacer y={0.5} />
                                            </>
                                        )}

                                        <InputPlaces
                                            initialValue={state.locations.name}
                                            onChange={handleChangePlaces}
                                        />

                                        <Spacer y={1} />
                                    </>
                                )
                            }

                            if (input.type === 'categories') {
                                return (
                                    <>
                                        {input.label && (
                                            <>
                                                <InputLabel>{input.label}</InputLabel>
                                                <Spacer y={0.5} />
                                            </>
                                        )}
                                        {renderSelect()}
                                        <Spacer y={.5} />
                                    </>
                                )
                            }

                        })}

                        <Fieldset.Footer>
                            <Fieldset.Footer.Status>
                                Estas informações apenas serão utilizadas para criar o seu perfil de voluntário.
                            </Fieldset.Footer.Status>
                            <Fieldset.Footer.Actions>
                                <ButtonZeit
                                    type="secondary"
                                    size="small"
                                    auto
                                    loading={loadingSubmit}
                                    onClick={handleSave}
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
                        {privacyFields.map(input => {
                            if (input.type === 'text') {
                                return (
                                    <>
                                        <Input
                                            label={input.label}
                                            className='full-width'
                                            placeholder={input.placeholder}
                                            value={state[input.name]}
                                            onChange={e => handleInputChange(e, input)}
                                        />
                                    </>
                                )
                            }
                        })}

                        <Fieldset.Footer>
                            <Fieldset.Footer.Status>
                                Por favor insira um e-mail válido. Caso contrário poderá não receber oportunidades de voluntariado.
                            </Fieldset.Footer.Status>
                            <Fieldset.Footer.Actions>
                                <ButtonZeit
                                    type="secondary"
                                    size="small"
                                    auto
                                    loading={loadingSubmit}
                                    onClick={handleSave}
                                >
                                    Guardar
                                      </ButtonZeit>
                            </Fieldset.Footer.Actions>
                        </Fieldset.Footer>
                    </Fieldset>

                    <Spacer y={5} />
                </div>
            </div>
        </Layout >
    );

};

const Description = () => (
    <div className="hero__description--profile">
        <Avatar size='lg' />
    </div>
)

Profile.getInitialProps = (ctx) => withAuth(ctx, { redirectPublic: true, to: '/sign-in' })

export default withApollo({ ssr: true })(Profile)