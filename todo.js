//input alanı
const todoName = document.querySelector('#task')
//ul alanı 
const list = document.querySelector('#list')
//ekle butonu
const addButton = document.querySelector('#liveToastBtn')
//toast message için alan
const feedback = document.querySelector('#toast')
//listedeki li elemanlarını seçmek içiin
const listLi = list.querySelectorAll('li')

const closeButton = `<button type="button" id="closeButton" class="btn-close" style="float: right;" aria-label="Close"></button>`;
let todos = [];

runEvents();
function runEvents(){
    addCloseButton ()
    addButton.addEventListener("click" , addTodo)
    document.addEventListener('click' , removeTodoToUI)

}

function addTodo(){
    const input = todoName.value.trim()
    if (input == null || input ==""){
        showErrorToast();
    }
    else{
        // ekrana yazdır
        addTodoToScreen(input);
        //eklendi bildirimi
        showSuccessToast();
        //storage üzerine yazdır
        addTodoToStorage(input);
    }
}
//close buton ekleme
function addCloseButton (){
    const listLi = list.querySelectorAll('li')
    listLi.forEach(function write(item){
    item.innerHTML += closeButton;
    })
}
//toast bildirimi
// Başarılı toast bildirimini gösteren fonksiyon
function showSuccessToast() {
    const successToast = document.querySelector('.toast.success');
    const toast = new bootstrap.Toast(successToast);
    toast.show();
}
  
// Başarısız toast bildirimini gösteren fonksiyon
function showErrorToast() {
    const errorToast = document.querySelector('.toast.error');
    const toast = new bootstrap.Toast(errorToast);
    toast.show();
}

//ekranda girilen inputu ekranda listeleme
function addTodoToScreen (newTodo){
    const newLi = document.createElement("li");
    newLi.innerHTML = newTodo + closeButton;
    list.appendChild(newLi)
    todoName.value = "" 
}

//girilen inputu local storage üzerine kaydetme
// function storageCheck() {
//     if (localStorage.getItem("todos") === null) {
//         todos = [];
//     }
//     else {
//         todos = JSON.parse(localStorage.getItem("todos"));
//     }
// }
function addTodoToStorage(newTodo){
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos)); 
}
//çarpı işaretine basınca todo ları local storage üzerinden ve ekrandan silmek
//ekrandan silmek
function removeTodoToUI (e){
    if(e.target.id === "closeButton"){
       const removeTodo = e.target.parentElement;
       removeTodo.remove();
       removeTodoToStorage(removeTodo.textContent);
    }
}
//storage üzerinden silinmesi için
function removeTodoToStorage (removeTodoStorage) {
    todos.forEach(function(todo , index){
        if(removeTodoStorage === todo){
            todos.splice(index,1)
        }
    });
    localStorage.setItem("todos" , JSON.stringify(todos));
}

//liste elemanına tıklayınca yapıldı olarak işaretlenmesi

list.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    }
});