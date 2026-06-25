// HTML Elements

const dishesContainer = document.getElementById("dishes-container");
const btnAddDish = document.getElementById("btn-add-dish");
const modal = document.getElementById("dish-modal");
const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");

const inputCode = document.getElementById("dish-code");
const inputName = document.getElementById("dish-name");
const inputDescription = document.getElementById("dish-description");
const inputPrice = document.getElementById("dish-price");

const ingredientsList = document.getElementById("ingredients-list");
const selectedContainer = document.getElementById("selected-ingredients");

const btnLogout = document.getElementById("btn-logout");
const btnLogoutMobile = document.getElementById("btn-logout-mobile");

// Data

let ingredients =
JSON.parse(localStorage.getItem("ingredients"));

if(!ingredients){

    ingredients=[];

}

let dishes =
JSON.parse(localStorage.getItem("dishes"));

if(!dishes){

    dishes=[];

}

let selectedIngredients=[];

// Functions

function clearDishes(){

    dishesContainer.replaceChildren();

}

function clearIngredientsList(){

    ingredientsList.replaceChildren();

}

function clearSelected(){

    selectedContainer.replaceChildren();


}

function clearForm(){

    inputCode.value="";
    inputName.value="";
    inputDescription.value="";
    inputPrice.value="";

    selectedIngredients=[];

    clearSelected();

}

function openModal(){

    loadIngredients();

    modal.style.display="flex";

}

function closeModal(){

    modal.style.display="none";

}

function logout(event){

    event.preventDefault();

    const confirmLogout=confirm("Are you sure you want to logout?");

    if(confirmLogout){

        window.location.href="index.html";

    }

}

function saveStorage(){

    localStorage.setItem(
        "dishes",
        JSON.stringify(dishes)
    );

}

function loadIngredients(){

    clearIngredientsList();

    ingredients.forEach(function(ingredient){

        const row=document.createElement("div");
        row.classList.add("ingredient-item");

        const name=document.createElement("p");
        name.textContent=ingredient.name;

        const btnAdd=document.createElement("button");
        btnAdd.textContent="+";

        btnAdd.addEventListener("click",function(){

            selectedIngredients.push(ingredient.name);

            displaySelected();

        });

        row.appendChild(name);
        row.appendChild(btnAdd);

        ingredientsList.appendChild(row);

    });

}

function displaySelected(){

    clearSelected();

    selectedIngredients.forEach(function(item){

        const paragraph=document.createElement("p");
        paragraph.textContent=item;

        selectedContainer.appendChild(paragraph);

    });

}

function displayDishes(list){

    clearDishes();

    list.forEach(function(dish){

        const card=document.createElement("article");
        card.classList.add("ingredient-card");

        const info=document.createElement("div");
        info.classList.add("ingredient-info");

        const title=document.createElement("h3");
        title.textContent=dish.name;

        const description=document.createElement("p");
        description.textContent=dish.description;

        const price=document.createElement("p");
        price.textContent="$"+dish.price;

        info.appendChild(title);
        info.appendChild(description);
        info.appendChild(price);

        dish.ingredients.forEach(function(item){

            const ingredient=document.createElement("p");
            ingredient.textContent=item;

            info.appendChild(ingredient);

        });

        const actions=document.createElement("div");
        actions.classList.add("actions");

        const btnDelete=document.createElement("button");
        btnDelete.textContent="🗑";

        btnDelete.addEventListener("click",function(){

            dishes=dishes.filter(function(item){

                return item.id!==dish.id;

            });

            saveStorage();

            displayDishes(dishes);

        });

        actions.appendChild(btnDelete);

        card.appendChild(info);
        card.appendChild(actions);

        dishesContainer.appendChild(card);

    });

}

function saveDish(){

    if(
        inputCode.value===""||
        inputName.value===""||
        inputDescription.value===""||
        inputPrice.value===""
    ){

        alert("Complete all fields");

        return;

    }

    if(selectedIngredients.length===0){

        alert("Select at least one ingredient");

        return;

    }

    const dish={

        id:Date.now(),
        code:inputCode.value,
        name:inputName.value,
        description:inputDescription.value,
        price:Number(inputPrice.value),
        ingredients:selectedIngredients

    };

    dishes.push(dish);

    saveStorage();

    displayDishes(dishes);

    clearForm();

    closeModal();

}

function registerEvents(){

    btnAddDish.addEventListener("click",openModal);

    btnCancel.addEventListener("click",function(){

        clearForm();

        closeModal();

    });

    btnSave.addEventListener("click",saveDish);

    if(btnLogout){

        btnLogout.addEventListener("click",logout);

    }

    if(btnLogoutMobile){

        btnLogoutMobile.addEventListener("click",logout);

    }

}

function execution(){

    displayDishes(dishes);

    registerEvents();

}

document.addEventListener("DOMContentLoaded",execution);