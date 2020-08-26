var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var pageContentE1 = document.querySelector("#page-content");



taskIdCounter = 0;

var createTaskHandler = function() {

    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
    // buttonE1.addEventListener("click", createTaskHandler);
}

//     var listItemE1 = document.createElement("li");
//     listItemE1.className = "task-item";
//     listItemE1.textContent = "This is a new task";
//     tasksToDoE1.appendChild(listItemE1);
// }

var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!")
        return false;
    }

    formE1.reset();
    var isEdit = formE1.hasAttribute("#data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskE1 function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        // send it as an arguement to createTaskE1
        createTaskE1(taskDataObj);



    }
};

var createTaskE1 = function(taskDataObj) {
    // create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    // add task id as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);
    // Create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    // Give it a class name
    taskInfoE1.className = "task-info";
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"

    listItemE1.appendChild(taskInfoE1);
    // add entire list item to list
    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskActionsE1);

    tasksToDoE1.appendChild(listItemE1);

    //increase task counter for next unique id
    taskIdCounter++;
    listItemE1.textContent = taskNameInput;

};

var createTaskActions = function(taskId) {
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";
    // create edit button
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(editButtonE1);

    //Create delete button
    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonE1);

    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute = ("name", "status-change");
    statusSelectE1.setAttribute = ("data-task-id", taskId);

    actionContainerE1.appendChild(statusSelectE1);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionE1 = document.createElement("option");
        statusOptionE1.textContent = statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectE1.appendChild(statusOptionE1);
    }

    return actionContainerE1;
}




var taskButtonHandler = function(event) {
    // get target element from event 
    var targetE1 = event.target;

    //Edit button was clicked
    if (targetE1.matches(".edit-btn")) {
        var taskId = targetE1.getAttribute("data-task-id");
        editTask(taskId);
    }


    if (event.target.matches(".delete-btn")); {
        // get element's task id 
        var taskId = event.target.getAttribute("data-task-id");
    }

};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Add Task";
    formE1.removeAttribute("data-task-id");
}

var completEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task Updated!");
}
formE1.addEventListener("click", createTaskHandler);