// HTML Elements

const stockContainer = document.getElementById("stock-container");
const btnAddIngredient = document.getElementById("btn-add-ingredient");
const modal = document.getElementById("ingredient-modal");
const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");

const inputCode = document.getElementById("ingredient-code");
const inputName = document.getElementById("ingredient-name");
const inputDescription = document.getElementById("ingredient-description");
const inputQuantity = document.getElementById("ingredient-quantity");
const inputUnit = document.getElementById("ingredient-unit");

const btnMenu = document.getElementById("btn-menu");
const sidebar = document.querySelector(".sidebar");
const btnLogout = document.getElementById("btn-logout");

// Data

let ingredients = [

    {
        id:1,
        code:"ING001",
        name:"Beef",
        description:"Fresh beef",
        quantity:12,
        unit:"kg"
    },

    {
        id:2,
        code:"ING002",
        name:"Onion",
        description:"White onion",
        quantity:8,
        unit:"kg"
    },

    {
        id:3,
        code:"ING003",
        name:"Chocolate",
        description:"Milk chocolate",
        quantity:15,
        unit:"bars"
    }

];

// Utility Functions

function clearIngredients(){

    stockContainer.replaceChildren();

}

function clearForm(){

    inputCode.value = "";
    inputName.value = "";
    inputDescription.value = "";
    inputQuantity.value = "";
    inputUnit.value = "";

}

function openModal(){

    modal.style.display = "flex";

}

function closeModal(){

    modal.style.display = "none";

}

function toggleMenu(){

    sidebar.classList.toggle("show-menu");

}

function logout(){

    const confirmLogout = confirm("Are you sure you want to logout?");

    if(confirmLogout){

        window.location.href = "login.html";

    }

}

// Display Ingredients

function displayIngredients(list){

    clearIngredients();

    list.forEach(ingredient => {

        const card = document.createElement("article");
        card.classList.add("ingredient-card");

        const info = document.createElement("div");
        info.classList.add("ingredient-info");

        const title = document.createElement("h3");
        title.textContent = ingredient.name;

        const quantity = document.createElement("p");
        quantity.textContent = ingredient.quantity + " " + ingredient.unit;

        info.appendChild(title);
        info.appendChild(quantity);

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const btnMinus = document.createElement("button");
        btnMinus.textContent = "-";

        btnMinus.addEventListener("click",function(){

            if(ingredient.quantity > 0){

                ingredient.quantity--;
                displayIngredients(ingredients);

            }

        });

        const btnPlus = document.createElement("button");
        btnPlus.textContent = "+";

        btnPlus.addEventListener("click",function(){

            ingredient.quantity++;
            displayIngredients(ingredients);

        });

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "🗑";

        btnDelete.addEventListener("click",function(){

            ingredients = ingredients.filter(item => {

                return item.id !== ingredient.id;

            });

            displayIngredients(ingredients);

        });

        actions.appendChild(btnMinus);
        actions.appendChild(btnPlus);
        actions.appendChild(btnDelete);

        card.appendChild(info);
        card.appendChild(actions);

        stockContainer.appendChild(card);

    });

}

// Save Ingredient

function saveIngredient(){

    if(
        inputCode.value === "" ||
        inputName.value === "" ||
        inputDescription.value === "" ||
        inputQuantity.value === "" ||
        inputUnit.value === ""
    ){

        alert("Complete all fields");
        return;

    }

    const ingredient = {

        id:Date.now(),
        code:inputCode.value,
        name:inputName.value,
        description:inputDescription.value,
        quantity:Number(inputQuantity.value),
        unit:inputUnit.value

    };

    ingredients.push(ingredient);

    displayIngredients(ingredients);

    clearForm();
    closeModal();

}

// Events

function registerEvents(){

    btnAddIngredient.addEventListener("click",openModal);

    btnCancel.addEventListener("click",function(){

        clearForm();
        closeModal();

    });

    btnSave.addEventListener("click",saveIngredient);

    if(btnMenu){

        btnMenu.addEventListener("click",toggleMenu);

    }

    if(btnLogout){

        btnLogout.addEventListener("click",logout);

    }

}

// Execution

function execution(){

    registerEvents();
    displayIngredients(ingredients);

}

document.addEventListener("DOMContentLoaded",execution);


