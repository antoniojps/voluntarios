import { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { UPDATE_USER_MUTATION } from '../graphql'
import { Layout, Avatar } from 'components/atoms'
import { ProfileForm } from 'components/organisms'
import { withAuth } from 'utils/auth';
import { Spacer, Note, useToasts } from '@zeit-ui/react'
import { withApollo } from '../apollo/client';
import { fetchGeolocationsById } from '../services/places';
import { mergeLocations, computeNewLocationsIDs, parseCategories } from '../utils/form'

const Profile = ({ user = { firstName: null, lastName: null, email: null, job: null, categories: [], locations: [] } }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [updateUser, { data, loading }] = useMutation(UPDATE_USER_MUTATION);
    const client = useApolloClient();
    const [, setToast] = useToasts()
    const [userState, setUser] = useState(user)

    useEffect(() => {
        if (!loading && data && data.updateUser) {
            const { updateUser } = data
            setUser(updateUser)
        }
    }, [data, loading])

    async function handleSave(data) {
        setSubmitError(false);
        setLoadingSubmit(true);

        const userLocations = user && user.locations && user.locations.length > 0 ? user.locations : []
        const selectedLocations = data && data.locations && data.locations.length > 0 ? data.locations : []
        const newLocationsIDs = computeNewLocationsIDs(userLocations, selectedLocations)

        // fetch all new locations
        const newGeolocations = await fetchGeolocationsById(newLocationsIDs)
        // merge old locations and new locations
        const newUserLocations = mergeLocations(newGeolocations, userLocations, selectedLocations)

        const { firstName, lastName, job, categories } = data
        const input = {
            firstName,
            lastName,
            name: `${firstName} ${lastName}`,
            job,
            locations: newUserLocations,
            categories: parseCategories(categories),
        }

        try {
            await client.resetStore();
            await updateUser({
                variables: {
                    input,
                    userId: user._id,
                },
            });
            setToast({
                text: 'Perfil atualizado.',
            })
            setLoadingSubmit(false);
        } catch (error) {
            setToast({
                text: 'Não foi possível atualizar o perfil.',
                type: 'error',
            })
            setSubmitError(true);
            setLoadingSubmit(false);
        }
    }

    return (
        <Layout title={`${userState.firstName} ${userState.lastName}`} description={<Description />}>
            <div className="container">
                <div className="row flex-column justify-content-md-center">
                    {submitError && (
                        <>
                            <Note label={false} type="error" style={{ height: 'fit-content' }}>Pedimos desculpa. Ocorreu um erro a atualizar os seus dados.</Note>
                            <Spacer y={1} />
                        </>
                    )}
                    <ProfileForm
                        firstName={user.firstName}
                        lastName={user.lastName}
                        job={user.job}
                        locations={user.locations}
                        email={user.email}
                        categories={user.categories}
                        loading={loadingSubmit}
                        onSubmit={handleSave}
                    />

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