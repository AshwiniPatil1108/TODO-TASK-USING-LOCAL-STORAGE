const cl = console.log;

const todoForm = document.getElementById("todoForm")
const submitbtn = document.getElementById("submitbtn")
const upadatebtn = document.getElementById("upadatebtn")
const todoItemControl = document.getElementById("todoItem")
const todoListontainer = document.getElementById("todoListontainer")


const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


const onEdit = (ele) => {
	let getEditId = ele.closest('li').id;
	cl(getEditId );
	localStorage.setItem('editId', getEditId)
	
	let getObject  = todoArr.find(todo => todo.todoId === getEditId)
	cl( getObject);
	todoItemControl.value = getObject.todoItem
	submitbtn.classList.add('d-none')
	upadatebtn.classList.remove('d-none')
} 

const createTodoList =(arr) =>{
	let result ='';
	arr.forEach(todo => {
		result += `<li class="list-group-item d-flex justify-content-between" id ="${todo.todoId}">
			<span>${todo.todoItem}</span>
			<span>
				<button class="btn btn-outline-primary btn-sm" onclick ="onEdit(this)">Edit Todo</button>
				<button class="btn btn-outline-danger btn-sm">Remove Todo</button>
			</span>
		</li>`
	})
	todoListontainer.innerHTML = result;
}

let todoArr =JSON.parse(localStorage.getItem("todoArr")) || [];


if(todoArr.length > 0){
	createTodoList(todoArr)
}


const onTodoAdd =(eve)=>{
	eve.preventDefault();
	let todoObj ={
		todoItem : todoItemControl.value,
		todoId : generateUuid()
	}
	eve.target.reset();
	todoArr.unshift(todoObj);//new objectis added in Array
	//store / update array in local storage in the form of JSON
	localStorage.setItem("todoArr", JSON.stringify(todoArr))
	//get array from LS in the form of JSON
	todoArr = JSON.parse(localStorage.getItem("todoArr"))
	//send that array to templating function
	createTodoList(todoArr)
}

const onTodoUpadate =() =>{
	cl('Upadated !!')
	let getUpadteId = localStorage.getItem("editId")
	cl(getUpadteId)
	let updatedObj = {
		todoItem : todoItemControl.value,
		todoId : getUpadteId
	}
	cl(updatedObj) 
	todoItemControl.value = ''
	
	let getIndex = todoArr.findIndex(todo => todo.todoId === getUpadteId)
	cl(getIndex)
	todoArr[getIndex] = updatedObj;
	localStorage.setItem('todoArr', JSON.stringify(todoArr))
	createTodoList(todoArr)
	submitbtn.classList.remove('d-none')
	upadatebtn.classList.add('d-none')
	
}

todoForm.addEventListener("submit", onTodoAdd);
upadatebtn.addEventListener("click", onTodoUpadate)