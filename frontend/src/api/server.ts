
export const server_calls = {
    getFoods: async (queryFood: string) => {
        const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${ queryFood }`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': 'process.env.REACT_APP_NUTRITIONIX_APP_ID',
                'x-app-key': 'process.env.REACT_APP_NUTRITIONIX_APP_KEY',
                'x-remote-user-id': 'process.env.REACT_APP_NUTRITIONIX_REMOTE_USER_ID',
            },
        });
        
        const data = await response.json()
        return data
    },


    getNutritionInfo: async (food_name: string) => {
        const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients?query=${ food_name }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': 'process.env.REACT_APP_NUTRITIONIX_APP_ID',
                'x-app-key': 'process.env.REACT_APP_NUTRITIONIX_APP_KEY',
                'x-remote-user-id': 'process.env.REACT_APP_NUTRITIONIX_REMOTE_USER_ID',
            },
            body: JSON.stringify({
                query: food_name
            })
        });

        if (!response.ok) {
            throw new Error(`The food '${food_name}' does not exist.`)
        }

        return await response.json()
    }
}
