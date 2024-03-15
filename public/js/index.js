const searchRecipe = () => {
    const inputValue = document.getElementById("search-input").value;
    console.log(inputValue);
    fetch(`https://api.edamam.com/search?q=${inputValue}&app_id=717f8301&app_key=2696b2396516b977e8b958441a26feca`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.hits)) {
                const recipeCardContainer = document.querySelector("#recipe-cards");
                recipeCardContainer.innerHTML = "";
                const fragment = document.createDocumentFragment();
                data.hits.forEach(recipe => {
                    console.log(recipe);
                    const resultTemplate = document.getElementsByTagName("template")[0];
                    console.log(resultTemplate);
                    const card = resultTemplate.content.cloneNode(true);
                    const header = card.querySelector("[data-header]");
                    const link = document.createElement("a");
                    link.href = recipe.recipe.url;
                    link.textContent = recipe.recipe.label;
                    header.appendChild(link);
                    console.log(card);
                    fragment.appendChild(card);
                })
                recipeCardContainer.appendChild(fragment);
            }
        })
}