import { useEffect } from 'react'
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

    useEffect(() => {
        console.log('profile data', state)
    }, [state])

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
        let latitude = user.locations[0].geolocation.latitude;
        let longitude = user.locations[0].geolocation.longitude;
       
        const geo = await fetchGeoLocation(state.locations._id);
        if (!geo || !geo.results || geo.results.length === 0) {
            console.log('erro. localizacao invalida')
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

        console.log(formState);

        try {
            await client.resetStore();
            const { data } = await updateUser({
                variables: formState,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
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

    return (
        <Layout title={`${state.firstName} ${state.lastName}`} description={<Description />}>
            <div className="container">
                <div className="row flex-column justify-content-md-center">

                    <Fieldset>
                        <Fieldset.Title>Informações pessoais</Fieldset.Title>
                        <Fieldset.Subtitle>Por favor introduza o seu primeiro e último nome.</Fieldset.Subtitle>
                        <Spacer y={1} />
                        <Input
                            className='full-width'
                            placeholder="Primeiro nome"
                            value={state.firstName}
                            onChange={e => setState({ firstName: e.target.value })} />
                        <Spacer y={0.5} />
                        <Input
                            className='full-width'
                            placeholder="Sobrenome"
                            value={state.lastName}
                            onChange={e => setState({ lastName: e.target.value })}
                        />
                        <Fieldset.Footer>
                            <Fieldset.Footer.Status>
                                Por favor utilize 32 caracteres no máximo para cada um dos campos.
                            </Fieldset.Footer.Status>
                            <Fieldset.Footer.Actions>
                                <ButtonZeit
                                    type="secondary"
                                    size="small"
                                    auto
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
                        <InputLabel>Profissão/Ocupação</InputLabel>
                        <Spacer y={0.5} />
                        <Input
                            className='full-width'
                            placeholder="Insira a sua profissão ou ocupação"
                            value={state.job}
                            onChange={e => setState({ job: e.target.value })}
                        />

                        <Spacer y={1} />
                        <InputLabel>Localização</InputLabel>
                        <Spacer y={0.5} />


                        <InputPlaces
                            initialValue={state.locations.name}
                            onChange={handleChangePlaces}
                        />

                        <Spacer y={1} />
                        <InputLabel>Competências / Áreas de interesse</InputLabel>
                        <Spacer y={0.5} />
                        {renderSelect()}
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
                        <Input
                            label='E-mail'
                            className='full-width'
                            placeholder="Insira o seu e-mail"
                            value={state.email}
                            onChange={e => setState({ email: e.target.value })}
                        />
                        <Fieldset.Footer>
                            <Fieldset.Footer.Status>
                                Por favor insira um e-mail válido. Caso contrário poderá não receber oportunidades de voluntariado.
                            </Fieldset.Footer.Status>
                            <Fieldset.Footer.Actions>
                                <ButtonZeit
                                    type="secondary"
                                    size="small"
                                    auto
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
            <style jsx>{`

            `}</style>
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