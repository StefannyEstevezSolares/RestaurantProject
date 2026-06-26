// HTML Elements

const usersContainer=document.getElementById("users-container");
const btnAddUser=document.getElementById("btn-add-user");
const modal=document.getElementById("user-modal");
const btnSave=document.getElementById("btn-save");
const btnCancel=document.getElementById("btn-cancel");

const inputCode=document.getElementById("user-code");
const inputIdentification=document.getElementById("user-identification");
const inputName=document.getElementById("user-name");
const inputPhone=document.getElementById("user-phone");
const inputEmail=document.getElementById("user-email");
const inputGender=document.getElementById("user-gender");

const btnLogout=document.getElementById("btn-logout");
const btnLogoutMobile=document.getElementById("btn-logout-mobile");

// Data

let users=
JSON.parse(
localStorage.getItem("users")
);

if(!users){

    users=[];

}

// Functions

function clearUsers(){

    usersContainer.replaceChildren();

}

function clearForm(){

    inputCode.value="";
    inputIdentification.value="";
    inputName.value="";
    inputPhone.value="";
    inputEmail.value="";
    inputGender.value="";

}

function openModal(){

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

function saveStorage(){

    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

}

// Display Users

function displayUsers(list){

    clearUsers();

    list.forEach(function(user){

        const card=document.createElement("article");
        card.classList.add("ingredient-card");

        const info=document.createElement("div");
        info.classList.add("ingredient-info");

        const title=document.createElement("h3");
        title.textContent=user.name;

        const identification=document.createElement("p");
        identification.textContent="ID: "+user.identification;

        const phone=document.createElement("p");
        phone.textContent="Phone: "+user.phone;

        const email=document.createElement("p");
        email.textContent="Email: "+user.email;

        const gender=document.createElement("p");
        gender.textContent="Gender: "+user.gender;

        info.appendChild(title);
        info.appendChild(identification);
        info.appendChild(phone);
        info.appendChild(email);
        info.appendChild(gender);

        const actions=document.createElement("div");
        actions.classList.add("actions");

        const btnDelete=document.createElement("button");
        btnDelete.textContent="🗑";

        btnDelete.addEventListener("click",function(){

            users=users.filter(function(item){

                return item.id!==user.id;

            });

            saveStorage();

            displayUsers(users);

        });

        actions.appendChild(btnDelete);

        card.appendChild(info);
        card.appendChild(actions);

        usersContainer.appendChild(card);

    });

}

// Save User

function saveUser(){

    if(

        inputCode.value===""||
        inputIdentification.value===""||
        inputName.value===""||
        inputPhone.value===""||
        inputEmail.value===""

    ){

        alert("Complete all fields");

        return;

    }

    const user={

        id:Date.now(),
        code:inputCode.value,
        identification:inputIdentification.value,
        name:inputName.value,
        phone:inputPhone.value,
        email:inputEmail.value,
        gender:inputGender.value

    };

    users.push(user);

    saveStorage();

    displayUsers(users);

    clearForm();

    closeModal();

}


// Events

function registerEvents(){

    btnAddUser.addEventListener("click",openModal);

    btnCancel.addEventListener("click",function(){

        clearForm();

        closeModal();

    });

    btnSave.addEventListener("click",saveUser);

    if(btnLogout){

        btnLogout.addEventListener("click",logout);

    }

    if(btnLogoutMobile){

        btnLogoutMobile.addEventListener("click",logout);

    }

}


// Execution

function execution(){

    displayUsers(users);

    registerEvents();

}

document.addEventListener("DOMContentLoaded",execution);