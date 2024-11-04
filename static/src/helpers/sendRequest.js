export const sendRequest = async (entity, method = 'GET', config, headers) => {
    try {
        const response = await fetch(`${entity}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            ...config
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            const errorData = await response.json(); // Get the error details from the response
            throw errorData; // Throw the error to be caught in the calling function
        }

        // For GET, POST, PUT, return the JSON response
        return response.json();
    } catch (error) {
        //console.error('Fetch error:', error); // Log any errors encountered during fetch
        throw error; // Rethrow the error to handle it in the calling function
    }
};