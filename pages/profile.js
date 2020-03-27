import { useSetState } from 'react-use'
import { useQuery } from '@apollo/react-hooks';
import { CATEGORIES_QUERY } from '../graphql'
import { Layout, Avatar, Label, ButtonZeit } from 'components/atoms'
import { withAuth } from 'utils/auth';
import { Input, Spacer, Fieldset, Select, Container, Col, Row } from '@zeit-ui/react'
import { fetchPlace } from '../services/places';
import { withApollo } from '../apollo/client';
import InputLabel from '../components/atoms/Label/InputLabel'

const Profile = ({ user = { firstName: null, lastName: null, email: null, job: null, categories: [], locations: [1] } }) => {
    const [state, setState] = useSetState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        job: user.job,
        categories: user.categories,
        location: user.locations[0],
        description: '',
    });

    const removeCategory = category => {
        const index = state.categories.findIndex(i => i === category);
        return setState({
            categories: state.categories.slice(0, index).concat(state.categories.slice(index + 1, state.categories.length)),
        });
    }

    function renderSelect() {
        const { data, loading, error } = useQuery(CATEGORIES_QUERY);
        if (loading || error || !data.allCategories || data.allCategories.length === 0) return null;

        const addCategory = val => setState({
            categories: [
                ...state.categories,
                data.allCategories[val],
            ],
        })

        return (
            <Select
                // className='full-width'
                placeholder="Selecione áreas de interesse."
                onChange={addCategory}
            >
                {data.allCategories.map((category, i) => (
                    <Select.Option
                        key={category._id}
                        value={i}
                        disabled={state.categories.find(cat => cat._id === category._id)}
                    >
                        {category.name}
                    </Select.Option>
                ))}
            </Select>
        )
    }

    async function handleFetchPlace(e) {
        setState({ location: { ...state.location, name: e.target.value } });
        const place = await fetchPlace(e.target.value);
        console.log({place});
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
                                <ButtonZeit type="secondary" size="small" auto>Guardar</ButtonZeit>
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
                                <ButtonZeit type="secondary" size="small" auto>Guardar</ButtonZeit>
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
                        <Input
                            className='full-width'
                            placeholder="Procure pela sua localização"
                            value={state.location.name}
                            onChange={handleFetchPlace}
                        />

                        <Spacer y={1} />
                        <InputLabel>Competências / Áreas de interesse</InputLabel>
                        <Spacer y={0.5} />
                        {renderSelect()}

                        <Spacer y={1} />
                        <Container>
                            <Row>
                                {state.categories.map(category => (
                                    <div key={category._id}>
                                        <Col auto>
                                            <Label
                                                text={category.name}
                                                background={category.color}
                                                actionEnabled
                                                handleClick={() => removeCategory(category)}
                                            />
                                        </Col>
                                        <Spacer x={.5} />
                                    </div>
                                ))}
                            </Row>
                        </Container>

                        <Spacer y={.5} />

                        <Fieldset.Footer>
                            <Fieldset.Footer.Status>
                                Estas informações apenas serão utilizadas para criar o seu perfil de voluntário.
                            </Fieldset.Footer.Status>
                            <Fieldset.Footer.Actions>
                                <ButtonZeit type="secondary" size="small" auto>Guardar</ButtonZeit>
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

Profile.getInitialProps = (ctx) => withAuth(ctx, {redirectPublic: true, to: '/sign-in'})

export default withApollo({ssr: true})(Profile)