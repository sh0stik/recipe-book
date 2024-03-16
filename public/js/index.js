const searchRecipe = () => {
    const inputValue = document.getElementById("search-input").value;
    console.log(inputValue);
    fetch(`http://localhost:4004/search?query=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            const recipeCardContainer = document.querySelector("#recipe-cards");
            recipeCardContainer.innerHTML = "";
            const fragment = document.createDocumentFragment();
            const resultTemplate = document.getElementsByTagName("template")[0];
            if (!resultTemplate) {
                console.error('No <template> element found in the document.');
                return;
            }
            data.forEach(recipe => {
                const card = resultTemplate.content.cloneNode(true);
                const header = card.querySelector("[data-header]");
                const link = document.createElement("a");
                link.href = recipe.url;
                link.textContent = recipe.label;
                header.appendChild(link);
                fragment.appendChild(card);
            })
            recipeCardContainer.appendChild(fragment);
        })
        .catch(error => console.error('Error:', error));
}