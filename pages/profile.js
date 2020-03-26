import { useSetState } from 'react-use'
import { useQuery } from '@apollo/react-hooks';
import { CATEGORIES_QUERY } from '../graphql'
import { Layout, Avatar, Label } from 'components/atoms'
import { getUserProp } from 'utils/auth';
import { Input, Spacer, Fieldset, Button, Select, Container, Col, Row } from '@zeit-ui/react'
import { fetchPlace } from '../services/places';

const Profile = ({ user }) => {
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
        console.log(place);
    }


    return (
        <Layout title={user.name} description={<Description />}>
            <div className="container">
                <div className="row flex-column justify-content-md-center">

                    <Fieldset>
                        <Fieldset.Title>Informações pessoais</Fieldset.Title>
                        <Fieldset.Subtitle>Por favor introduza o seu nome.</Fieldset.Subtitle>
                        <Spacer y={1} />
                        <Input
                            label='Primeiro nome'
                            className='full-width'
                            placeholder="Insira o seu primeiro nome"
                            value={state.firstName}
                            onChange={e => setState({ firstName: e.target.value })} />
                        <Spacer y={0.5} />
                        <Input
                            label='Ultimo nome'
                            className='full-width'
                            placeholder="Insira o seu último nome"
                            value={state.lastName}
                            onChange={e => setState({ lastName: e.target.value })}
                        />
                        {/* <Spacer y={0.5} />
                        <Input label="Último nome" placeholder="Insira o seu último nome" value={state.name} onChange={e => setState({ name: e.target.value })} /> */}
                        <Fieldset.Footer>
                            <Fieldset.Footer.Status>
                                Por favor utilize 32 caracteres no máximo para cada um dos campos.
                            </Fieldset.Footer.Status>
                            <Fieldset.Footer.Actions>
                                <Button auto size="mini">Guardar alterações</Button>
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
                                <Button auto size="mini">Guardar alterações</Button>
                            </Fieldset.Footer.Actions>
                        </Fieldset.Footer>
                    </Fieldset>

                    <Spacer y={1} />

                    <Fieldset>
                        <Fieldset.Title>Detalhes do voluntário</Fieldset.Title>
                        <Fieldset.Subtitle>Informação acerca da sua experiência, áreas de atuação e interesse.</Fieldset.Subtitle>
                        <Spacer y={1} />
                        <Input
                            labelRight='Brevemente disponivel'
                            className='full-width'
                            disabled
                            placeholder="Insira uma breve descrição acerca dos seus interesses e a razão que o leva a desejar ser voluntário. (opcional)"
                            value={state.description}
                            onChange={e => setState({ description: e.target.value })}
                        />
                        <Spacer y={0.5} />
                        <Input
                            label='Profissão/Ocupação'
                            className='full-width'
                            placeholder="Insira a sua profissão ou ocupação"
                            value={state.job}
                            onChange={e => setState({ job: e.target.value })}
                        />

                        <Spacer y={.5} />

                        <Input
                            label='Localização'
                            className='full-width'
                            placeholder="Procure pela sua localização"
                            value={state.location.name}
                            onChange={handleFetchPlace}
                        />

                        <Spacer y={.5} />

                        {renderSelect()}

                        <Spacer y={.5} />
                        <Container>
                            <Row>
                                {state.categories.map(category => (
                                    <>
                                        <Col auto>
                                            <Label
                                                text={category.name}
                                                background={category.color}
                                                key={category._id}
                                                actionEnabled
                                                handleClick={() => removeCategory(category)}
                                            />
                                        </Col>
                                        <Spacer x={.5} />
                                    </>
                                ))}
                            </Row>
                        </Container>

                        <Spacer y={.5} />

                        <Fieldset.Footer>
                            <Fieldset.Footer.Status>
                                Estas informações apenas serão utilizadas para criar o seu perfil de voluntário.
                            </Fieldset.Footer.Status>
                            <Fieldset.Footer.Actions>
                                <Button auto size="mini">Guardar alterações</Button>
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

Profile.getInitialProps = getUserProp

export default Profile;