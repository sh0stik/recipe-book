const { API_KEY } = process.env;

module.exports = {
    searchRecipe: async (req, res) => {
        const { query } = req.query;
        const url = `https://api.edamam.com/search?q=${query}&app_id=717f8301&app_key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (Array.isArray(data.hits)) {
                const recipes = data.hits.map(recipe => ({
                    url: recipe.recipe.url,
                    label: recipe.recipe.label
                }));

                res.json(recipes);
            } else {
                res.status(404).json({ message: 'No recipes found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
}
