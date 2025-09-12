import useSWR from 'swr';

// This is a simple fetcher function that SWR will use to make API calls.
const fetcher = (url) => fetch(url).then((res) => res.json());

export function useUser() {
  // Use SWR to continuously fetch user data from our 'me' endpoint.
  // SWR handles caching, revalidation, and more automatically.
  const { data, error, mutate } = useSWR('/api/auth/me', fetcher);

  return {
    // If data exists and has a user object, return the user. Otherwise, null.
    user: data?.user,
    // The request is loading if there's no error and no data yet.
    isLoading: !error && !data,
    // There's an error if the fetcher throws an error.
    isError: error,
    // 'mutate' is a function from SWR that allows us to manually trigger a re-fetch.
    // We'll use this after logging out to update the user state.
    mutate,
  };
}
