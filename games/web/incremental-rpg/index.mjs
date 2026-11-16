import pkg from './app.js';

const { incremental_rpg } = pkg;

export const handler = async (event) => {
    try {
        const response = await incremental_rpg(event);
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};