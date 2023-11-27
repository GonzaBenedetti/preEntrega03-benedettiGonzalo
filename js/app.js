const navNewList = document.querySelector("#newToDoList");
const toDoList = document.querySelector("#toDoList");
const binToDoList = document.querySelector("#binToDoList");

let lists = [];
let bins = JSON.parse(localStorage.getItem("Bin")) || [];
let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

function NewTask(title, date, description) {
    this.title = title;
    this.date = date;
    this.description = description;
}

const createNewTask = () => {
    let existsMain = document.querySelector("#createTask");
    let bin = document.querySelector("#tasksListBin");
    let showTasks = document.querySelector("#tasksList");

    if (bin) {
        bin.remove();
    }

    if (showTasks) {
        showTasks.remove();
    }

    if (!existsMain) {
        let main = document.createElement("main");
        main.setAttribute("id", "createTask");
        main.innerHTML = `
        <section id="sectionCreate" class="sectionForm">
            <form action="">
                <h3>Create a new task</h3>
                <div class="titleForm">
                    <label for="titleNewToDoList"></label>
                    <input type="text" class="title" id="titleNewToDoList" placeholder="Title" autofocus required>
                    <label for="dateNewToDoList"></label>
                    <input type="date" class="date" id="dateNewToDoList" required>
                </div>
                <label for="descriptionNewToDoList"></label>
                <textarea name="" class="description" id="descriptionNewToDoList" placeholder="Description" required></textarea>
                <div class="btnForm">
                    <button class="btn" type="reset">Reset</button>
                    <button class="btn" id="saveTask">Save</button>
                </div>
            </form>
        </section>`;
        document.body.append(main);

        const btnSave = document.querySelector("#saveTask");
        const newTitle = document.querySelector("#titleNewToDoList");
        const newDate = document.querySelector("#dateNewToDoList");
        const newDescription = document.querySelector("#descriptionNewToDoList");

        btnSave.addEventListener("click", () => inTask(newTitle, newDate, newDescription));
    }
}

const showTasks = () => {
    let principal = document.querySelector("#createTask");
    let bin = document.querySelector("#tasksListBin");
    let showTasks = document.querySelector("#tasksList");

    if (principal) {
        principal.remove();
    }

    if (bin) {
        bin.remove();
    }

    if (!showTasks) {
        let main = document.createElement("main");
        let section = document.createElement("section");
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");

        main.setAttribute("id", "tasksList");
        document.body.append(main);

        section.setAttribute("class", "sectionTasks");
        document.querySelector("#tasksList").appendChild(section);

        table.setAttribute("class", "tableTasks");
        document.querySelector(".sectionTasks").appendChild(table);

        thead.setAttribute("class", "headTable");
        document.querySelector(".tableTasks").appendChild(thead);

        tbody.setAttribute("class", "bodyTable");
        document.querySelector(".tableTasks").appendChild(tbody);

        thead.innerHTML = `
            <tr>
                <th>Title</th>
                <th><span class="empty">Date</span></th>
                <th><span class="empty">Empty<i class='bx bxs-trash'></span></th>
            </tr>`;

        tasks.forEach((task, index) => {
            let trList = document.createElement("tr");
            trList.setAttribute("id", "listTasks");
            trList.innerHTML = `
                <td>${task.title}</td>
                <td>${task.date}</td>
                <td class="iconList">
                    <i class='bx bxs-trash empty' id="removeTask_${index}"></i>
                    <i class='bx bx-check empty' id="checkTask_${index}"></i>
                </td>`;
            tbody.appendChild(trList);

            let removeTask = document.getElementById(`removeTask_${index}`);
            let checkTask = document.getElementById(`checkTask_${index}`);

            removeTask.addEventListener("click", () => removeTaskList(trList));
            checkTask.addEventListener("click", () => taskChecked(checkTask, trList));
        });
    }
}

const showBins = () => {
    let principal = document.querySelector("#createTask");
    let bin = document.querySelector("#tasksListBin");
    let showTasks = document.querySelector("#tasksList");

    if (principal) {
        principal.remove();
    }

    if (showTasks) {
        showTasks.remove();
    }

    if (!bin) {
        let main = document.createElement("main");
        let section = document.createElement("section");
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");

        main.setAttribute("id", "tasksListBin");
        document.body.append(main);

        section.setAttribute("class", "sectionTasksBin");
        document.querySelector("#tasksListBin").appendChild(section);

        table.setAttribute("class", "tableTasks");
        document.querySelector(".sectionTasksBin").appendChild(table);

        thead.setAttribute("class", "headTable");
        document.querySelector(".tableTasks").appendChild(thead);

        tbody.setAttribute("class", "bodyTable");
        document.querySelector(".tableTasks").appendChild(tbody);

        thead.innerHTML = `
            <tr>
                <th>Title</th>
                <th><span class="empty">Empty<i class='bx bxs-trash'></span></th>
            </tr>`;

        bins.forEach((bin, index) => {
            let trList = document.createElement("tr");
            trList.setAttribute("id", "listTasks");
            trList.innerHTML = `
                <td>${bin.title}</td>
                <td class="iconList">
                    <i class='bx bxs-trash empty' id="removeTaskBin_${index}"></i>
                    <i class='bx bx-refresh empty' id="refreshTask_${index}"></i>
                </td>`;
            tbody.appendChild(trList);

            let removeTaskBin = document.getElementById(`removeTaskBin_${index}`);
            let refreshTask = document.getElementById(`refreshTask_${index}`);

            refreshTask.addEventListener("click", () => restoreTask(trList));
            removeTaskBin.addEventListener("click", () => removeListBin(trList));
        });
    }
}

navNewList.addEventListener("click", createNewTask);
toDoList.addEventListener("click", showTasks);
binToDoList.addEventListener("click", showBins);

const inTask = (newTitle, newDate, newDescription) => {
    let newTask = new NewTask(newTitle.value, newDate.value, newDescription.value);
    lists = tasks;

    lists.push(newTask);

    saveStorage("Tasks", JSON.stringify(lists));

    newTitle.value = '';
    newDate.value = '';
    newDescription.value = '';
}

const removeTaskList = (task) => {
    let index = Array.from(task.parentElement.children).indexOf(task);
    let taskBin = tasks.splice(index, 1)[0];

    saveStorage("Tasks", JSON.stringify(tasks));
    bins.push(taskBin);

    saveStorage("Bin", JSON.stringify(bins));

    task.remove();
}

const removeListBin = (bin) => {
    let index = Array.from(bin.parentElement.children).indexOf(bin);
    let binDelete = bins.splice(index, 1)[0];

    saveStorage("Bin", JSON.stringify(bins));

    bin.remove();
}

const restoreTask = (bin) => {
    let index = Array.from(bin.parentElement.children).indexOf(bin);
    let taskRest = bins.splice(index, 1)[0];

    saveStorage("Bin", JSON.stringify(bins));
    tasks.push(taskRest);

    saveStorage("Tasks", JSON.stringify(tasks));

    bin.remove();
}

const taskChecked = (checkTask, task) => {
    task.children[0].classList.toggle("tasksChecked");
    task.children[1].classList.toggle("tasksChecked");
    checkTask.classList.toggle("bx-x");
}

const saveStorage = (key, value) => localStorage.setItem(key, value);