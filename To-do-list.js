let form = document.querySelector("form");
var btn = form.querySelector("button");
var input = form.querySelector("input");
var listbox = document.querySelector(".list");
var regexp1 = /(^[\s]+$)/;
var clearall = document.getElementById("clear");

//accessing  values in string which are set as an array to single key:Allkey

var localitems = JSON.parse(localStorage.getItem('Allkey'));

//  date and time

var today = new Date();
var ampm = "am";
if (today.getHours() >= 12) {
    ampm = "pm";
}
function hrs() {
    if ((today.getHours()) > 12) {
        return (today.getHours() - 12);
    }
    else if ((today.getHours()) == 0) {
        return (12);
    }
    else return today.getHours();

}
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + hrs() + ":" + today.getMinutes() + " " + ampm;

// Add to do using enter key

document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") btn.click();
});

// add task through add button click

var editoradd = false;//check edited or add new todo.
function btnclick() {
    // check if input value isnot empty then store in local storage
    if (!(input.value == "") && (!input.value.match(regexp1))) {
        var texts = input.value;
        btn.style.backgroundColor = "blue";
        var todolist;
        if (editoradd == false) {

            if (localitems === null) localitems = [];
            todolist = {
                todo: texts,
                status: "pending",
                date: date
            }
            localitems.push(todolist);
        }
        else if (editoradd == true) {
            localitems[listid].todo = texts;
            localitems[listid].date = date + " " + "(edited)";
            editoradd = false;
        }
        localStorage.setItem('Allkey', JSON.stringify(localitems));
        displaytodo();
    }
    else {
        btn.style.backgroundColor = "skyblue";
        input.placeholder = "Enter Task first!"
    }
}

// set color action for  add task button

function checkbtn() {
    if (localitems.length === 0) {
        listbox.innerHTML = `<p>You have no pending tasks.</p>`;
        clearall.style.visibility = "hidden";
    }
    else if ((localitems.length) > 1) {
        clearall.style.visibility = "visible";
    }

    if (!(input.value == "") && (!input.value.match(regexp1))) {
        btn.style.backgroundColor = "blue";
    }
    else {
        btn.style.backgroundColor = "skyblue";
    }
}
setInterval(checkbtn, 1);

//display todo enter by user

displaytodo();
function displaytodo() {
    var list = "";
    if (localitems) {
        localitems.forEach((data, id) => {
            var checkornot = "";
            if (data.status == "Accomplished") { checkornot = "checked"; }

            list += `<div class="list-wrapper">
            <div class="chkbox">
                <input class="${checkornot}" onclick="ifchecked(this)" id="${id}" type="checkbox" ${checkornot}>
            </div>
            <div class="list-text">
                <p class="${checkornot}"> ${data.todo}</p>
            </div>
            <div class="buttons">
                <i title="Edit" class="fas fa-pen" id="pen" onclick="editlist(${id})"></i><i title="Delete"
                    class="fas fa-trash" id="trash" onclick="remove(${id})"></i>
            </div><section>${data.date}</section>
        </div>
    </div>`
        });
        listbox.innerHTML = list;
    }
}

// updating status Accomplished/pending

function ifchecked(check) {
    var checkid = check.id;
    var title = check.parentElement.parentElement.querySelector('.list-wrapper :nth-child(2)');
    if (check.checked) {
        title.classList.add("checked");
        localitems[checkid].status = "Accomplished";
    }
    else {
        title.classList.remove("checked");
        localitems[checkid].status = "Pending";
    }
    localStorage.setItem('Allkey', JSON.stringify(localitems));
}

//delete list item

function remove(select) {
    localitems.splice(select, 1);
    localStorage.setItem('Allkey', JSON.stringify(localitems));
    displaytodo();
}

//blur event for vanishing text from input field.

input.onblur = () => {
    btn.innerHTML = 'Add Task<i style="margin-left: 10px;"class="fas fa-add"></i>';
    function delay() {
        input.value = "";
    }
    setTimeout(delay, 1000);
}

// editing list item

function editlist(editID) {
    listid = editID;//global variable
    window.location.href = "#top";
    input.value = localitems[listid].todo;;
    input.focus();
    btn.innerHTML = 'Edit Task<i style="margin-left: 10px;" class="fas fa-pen"></i>';
    editoradd = true;
}

// clear all 

function clrall() {
    localitems.splice(0, localitems.length);
    localStorage.setItem('Allkey', JSON.stringify(localitems));
    displaytodo();
}










