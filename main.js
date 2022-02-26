document.getElementById('search-btn').addEventListener('click', function () {
    const inputField = document.getElementById('search-box')
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
        <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                            <button onclick="loadSingleItem(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Show Details
    </button>
                    </div>
                </div>
        `
        mainDiv.appendChild(div)
    });
}

const loadSingleItem = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url).then(res => res.json()).then(item => displaySingleItem(item))
}
// item.meals[0].strMeal
const displaySingleItem = item => {
    const modalBody = document.getElementById('modal-body')
    const div = document.createElement('div')
    modalBody.textContent = ''
    div.innerHTML = `
    <img src="${item.meals[0].strMealThumb}" class="card-img-top" alt="...">
<div class="w-full mx-auto text-center my-3">
<h3>Ingredients</h3>
<div class="d-flex flex-wrap justify-content-center ingredients mb-2" >
<p>${item.meals[0].strIngredient1}</p>
<p>${item.meals[0].strIngredient2}</p>
<p>${item.meals[0].strIngredient3}</p>
<p>${item.meals[0].strIngredient4}</p>
<p>${item.meals[0].strIngredient5}</p>
<p>${item.meals[0].strIngredient6}</p>
<p>${item.meals[0].strIngredient7}</p>
<p>${item.meals[0].strIngredient8}</p>
<p>${item.meals[0].strIngredient9}</p>
<p>${item.meals[0].strIngredient10}</p>

</div>
<h3>Details</h3>
<p>${item.meals[0].strInstructions}</p>
<button class="d-block mx-auto"><a class="btn btn-danger" href="${item.meals[0].strYoutube}" target="_blank">Youtube Video</a></button>
</div>


    `
    modalBody.appendChild(div)
    console.log(item)
    console.log(item.meals[0].strInstructions)
}