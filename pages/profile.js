import { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { UPDATE_USER_MUTATION } from '../graphql'
import { Layout, Avatar } from 'components/atoms'
import { ProfileForm } from 'components/organisms'

import { withAuth } from 'utils/auth';
import { Spacer, Note } from '@zeit-ui/react'
import { withApollo } from '../apollo/client';
import { fetchGeoLocation } from '../services/places';

const Profile = ({ user = { firstName: null, lastName: null, email: null, job: null, categories: [], locations: [1] } }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    const client = useApolloClient();

    async function handleSave(data) {
        setSubmitError(false);
        setLoadingSubmit(true);

        let latitude = data.locations[0].geolocation.latitude;
        let longitude = data.locations[0].geolocation.longitude;

        const geo = await fetchGeoLocation(data.locations[0]._id);
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
                ...user,
                _id: user._id,
                email: data.email,
                locations: {
                    name: data.locations[0].name,
                    geolocation: {
                        lat: latitude,
                        long: longitude,
                    },
                },
                categories: data.categories.map(cat => (cat._id)),
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

    return (
        <Layout title={`${user.firstName} ${user.lastName}`} description={<Description />}>
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
                        locations={user.locations[0]}
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