import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) => {
                    return defaultShouldDehydrateQuery(query) || query.state.status === 'pending';
                },
            },
        },
    });
}

export default function getQueryClient() {
    if (typeof window === 'undefined') {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
    }
}
