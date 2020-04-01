import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY } from './../graphql'
import { VolunteersList } from 'components/organisms'
import { withApollo } from '../apollo/client';

const Index = () => {
    const limit = 8;
    const [page, setPage] = useState(1);
    const filters = {
        input: {
            orderBy: {
                field: "createdAt",
                sort: "desc",
            },
        },
    };

    const { data, loading, error, fetchMore } = useQuery(
        USERS_QUERY,
        {
            variables: {
                ...filters,
                pagination: {
                    limit,
                    page: 1,
                },
            },
            fetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
        },
    );

    const hasNextPage = data && data.users && data.users.pageInfo && data.users.pageInfo.hasNextPage;

    function handleFetchMore() {
        fetchMore({
            variables: {
                pagination: {
                    limit,
                    page: page + 1,
                },
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    ...prev,
                    users: {
                        ...fetchMoreResult.users,
                        list: [
                            ...prev.users.list,
                            ...fetchMoreResult.users.list,
                        ],
                    },
                });
            },
        })
        if (hasNextPage) setPage(page + 1);
    }

    return (
        <div className="volunteers__feed-frame__no-filters">
            <VolunteersList
                data={data}
                loading={loading}
                error={error}
                handleFetchMore={handleFetchMore}
                hasNextPage={hasNextPage}
                hasMore={data && data.users && data.users.pageInfo && data.users.pageInfo.hasNextPage}
                hasFilters={false}
                removeFilters={undefined}
            />
        </div>
    );
};

export default withApollo({ ssr: false })(Index);
