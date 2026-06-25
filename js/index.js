// HTML Elements

const form=document.getElementById("login-form");
const inputUsername=document.getElementById("username");
const inputPassword=document.getElementById("password");

// Functions

function login(event){

    event.preventDefault();

    if(

        inputUsername.value===""||
        inputPassword.value===""

    ){

        alert("Complete all fields");

        return;

    }

    if(

        inputUsername.value==="admin"&&
        inputPassword.value==="1234"

    ){

        localStorage.setItem(

            "session",

            "true"

        );

        window.location.href="./stock.html";

    }

    else{

        alert("Incorrect username or password");

    }

}

// Events

function registerEvents(){
    form.addEventListener("submit",login);

}

// Execution

function execution(){
    registerEvents();

}

document.addEventListener("DOMContentLoaded",execution);