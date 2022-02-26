document.getElementById('search-btn').addEventListener('click', function () {
    const inputField = document.getElementById('search-field')
    const mealName = inputField.value
    inputField.textContent = ''
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data.meals))

})

const displayFood = meals => {
    const mainDiv = document.getElementById('main-container')
    mainDiv.textContent = ''
    meals.forEach(meal => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100" onclick="loadSingleItem(${meal.idMeal})">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                    </div>
                </div>
        `
        mainDiv.appendChild(div)
        console.log(meal)
    });
}

const loadSingleItem = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url).then(res => res.json()).then(item => displaySingleItem(item))
}
const displaySingleItem = item => {
    const header = document.getElementById('item-title')
    header.innerText = item.meals[0].strMeal

}