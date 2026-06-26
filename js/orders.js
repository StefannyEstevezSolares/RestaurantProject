// HTML Elements

const ordersContainer=document.getElementById("orders-container");
const btnAddOrder=document.getElementById("btn-add-order");
const modal=document.getElementById("order-modal");
const btnSave=document.getElementById("btn-save");
const btnCancel=document.getElementById("btn-cancel");
const selectCustomer=document.getElementById("customer-select");
const selectDish=document.getElementById("dish-select");
const inputQuantity=document.getElementById("dish-quantity");
const btnLogout=document.getElementById("btn-logout");
const btnLogoutMobile=document.getElementById("btn-logout-mobile");


// Data

let dishes=
JSON.parse(
localStorage.getItem("dishes")
);

if(!dishes){

    dishes=[];

}

let ingredients=
JSON.parse(
localStorage.getItem("ingredients")
);



if(!ingredients){

    ingredients=[];

}

let users=
JSON.parse(
localStorage.getItem("users")
);

if(!users){

    users=[];

}

let orders=
JSON.parse(
localStorage.getItem("orders")
);

if(!orders){

    orders=[];

}


// Storage

function saveStorage(){

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

}


// Utility Functions

function clearOrders(){

    ordersContainer.replaceChildren();

}


function clearForm(){

    selectCustomer.selectedIndex=0;

    inputQuantity.value=1;

    selectDish.selectedIndex=0;

}


function openModal(){

    if(dishes.length===0){

        alert("Create a dish first.");

        return;

    }

    loadUsers();
    loadDishes();
    modal.style.display="flex";

}


function closeModal(){

    modal.style.display="none";

}


function logout(event){

    event.preventDefault();

    const confirmLogout=
    confirm("Are you sure you want to logout?");

    if(confirmLogout){

        window.location.href="index.html";

    }

}


// Load Dishes

function loadDishes(){

    selectDish.replaceChildren();

    dishes.forEach(function(dish){

        const option=
        document.createElement("option");

        option.value=dish.id;

        option.textContent=dish.name;

        selectDish.appendChild(option);

    });

}

//users

function loadUsers(){

    selectCustomer.replaceChildren();
    users.forEach(function(user){
        const option=
        document.createElement("option");
        option.value=user.id;
        option.textContent=user.name;
        selectCustomer.appendChild(option);

    });

}

// Display Orders

function displayOrders(list){

    clearOrders();

    list.forEach(function(order){

        const card=document.createElement("article");
        card.classList.add("ingredient-card");

        const info=document.createElement("div");
        info.classList.add("ingredient-info");

        const customer=document.createElement("h3");
        customer.textContent=order.customer;

        const dish=document.createElement("p");
        dish.textContent="Dish: "+order.dish;

        const quantity=document.createElement("p");
        quantity.textContent="Quantity: "+order.quantity;

        const total=document.createElement("p");
        total.textContent="$"+order.total;

        const status=document.createElement("p");
        status.textContent="Status: "+order.status;

        info.appendChild(customer);
        info.appendChild(dish);
        info.appendChild(quantity);
        info.appendChild(total);
        info.appendChild(status);

        const actions=document.createElement("div");
        actions.classList.add("actions");

        const btnStatus=document.createElement("button");
        btnStatus.textContent="✔";

       btnStatus.addEventListener("click",function(){

    if(order.status==="Pending"){
        order.status="In Progress";

    }

    else if(order.status==="In Progress"){
        order.status="Delivered";

    }

    else{

        alert("Order already delivered");
        return;

    }

    saveStorage();
    displayOrders(orders);

});

        const btnDelete=document.createElement("button");
        btnDelete.textContent="🗑";

        btnDelete.addEventListener("click",function(){

            orders=orders.filter(function(item){

                return item.id!==order.id;

            });

            saveStorage();

            displayOrders(orders);

        });

        actions.appendChild(btnStatus);
        actions.appendChild(btnDelete);

        card.appendChild(info);
        card.appendChild(actions);

        ordersContainer.appendChild(card);

    });

}

// Save Order

function saveOrder(){

    if(users.length===0){

        alert("Create a user first");
    
        return;
    
    }

    const customerId=
    Number(selectCustomer.value);
    let selectedUser;
    users.forEach(function(user){
    if(user.id===customerId){
        selectedUser=user;

    }

});

    const dishId=
    Number(selectDish.value);

    const quantity=
    Number(inputQuantity.value);

    if(quantity<=0){

    alert("Enter a valid quantity");

    return;

}

    let selectedDish;

    dishes.forEach(function(dish){

        if(dish.id===dishId){

            selectedDish=dish;

        }

    });

    if(!selectedDish){

        alert("Dish not found");

        return;

    }

    let stockAvailable=true;

    selectedDish.ingredients.forEach(function(name){

        ingredients.forEach(function(ingredient){

            if(

                ingredient.name===name &&

                ingredient.quantity<quantity

            ){

                stockAvailable=false;

            }

        });

    });

    if(!stockAvailable){
        alert("Not enough stock");
        return;

    }

    selectedDish.ingredients.forEach(function(name){
        ingredients.forEach(function(ingredient){
            if(ingredient.name===name){
                ingredient.quantity-=quantity;

            }

        });

    });

    localStorage.setItem(

        "ingredients",

        JSON.stringify(ingredients)

    );

    const order={

        id:Date.now(),
        customer:selectedUser.name,
        phone:selectedUser.phone,
        dish:selectedDish.name,
        quantity:quantity,
        total:selectedDish.price*quantity,
        status:"Pending"

    };

    orders.push(order);
    saveStorage();
    displayOrders(orders);
    clearForm();
    closeModal();

}

// Events

function registerEvents(){

    btnAddOrder.addEventListener("click",openModal);
    btnCancel.addEventListener("click",function(){

        clearForm();
        closeModal();

    });

    btnSave.addEventListener("click",saveOrder);

    if(btnLogout){
        btnLogout.addEventListener("click",logout);

    }

    if(btnLogoutMobile){

        btnLogoutMobile.addEventListener("click",logout);

    }

}


// Execution

function execution(){

    displayOrders(orders);
    registerEvents();

}

document.addEventListener("DOMContentLoaded",execution);