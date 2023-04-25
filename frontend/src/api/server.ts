
export const server_calls = {
    getFoods: async (queryFood: string) => {
        const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${ queryFood }`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': '2ba8edb0',
                'x-app-key': '519d673e9153e0f0402e9adbc826e66f',
                'x-remote-user-id': '0',
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
                'x-app-id': '2ba8edb0',
                'x-app-key': '519d673e9153e0f0402e9adbc826e66f',
                'x-remote-user-id': '0',
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
