var priorirty;
var priorirties = document.querySelectorAll('.dropdown-item-priority');

Array.from(priorirties).forEach((pri) => {
  pri.addEventListener('click', (event) => {
    priorirty = pri.textContent;
    document.querySelector('.priority-selected').innerHTML = pri.textContent;
  });
});

var color;
var colors = document.querySelectorAll('.dropdown-item-color');

Array.from(colors).forEach((col) => {
  col.addEventListener('click', (event) => {
    color = col.textContent;
    color = color.toLowerCase();
    document.querySelector('.color-selected').innerHTML = col.textContent;
  });
});

document.querySelector('#add').addEventListener("click", function () {
  var name = document.querySelector("#input-name").value;
  if (name != "") {
    var desc = addTask(name);
    if (priorirty === 'High priority') {
      var element = document.querySelector(".high-container");
      element.appendChild(desc);
      desc.classList.add("box", "faded-out")
      setTimeout(function () {
        desc.classList.remove("faded-out")
      }, 500);
    }
    else if (priorirty === 'Medium priority') {
      var element = document.querySelector(".medium-container");
      element.appendChild(desc);
      desc.classList.add("box", "faded-out")
      setTimeout(function () {
        desc.classList.remove("faded-out")
      }, 500);
    }

    else if (priorirty === 'Low priority') {
      var element = document.querySelector(".low-container");
      element.appendChild(desc);
      desc.classList.add("faded-out")
      setTimeout(function () {
        desc.classList.remove("faded-out")
      }, 500);
    }
    document.querySelector("#input-name").value = '';
    document.querySelector(".priority-selected").textContent = "Choose a priority";
    document.querySelector(".color-selected").textContent = "Choose a color";
    }
})

document.querySelector('#filter-red').addEventListener("click", function () {
  var tasks = document.querySelectorAll(".task .desc");
  for (i = 0; i < tasks.length; i++){
    tasks[i].style.display = "none";
  }
  for (i = 0; i < tasks.length; i++){
    if (tasks[i].getAttribute("color") === "red") {
      tasks[i].style.display = "block";
    }
  }
})

document.querySelector('#filter-green').addEventListener("click", function () {
  var tasks = document.querySelectorAll(".task .desc");
  for (i = 0; i < tasks.length; i++){
    tasks[i].style.display = "none";
  }
  for (i = 0; i < tasks.length; i++){
    if (tasks[i].getAttribute("color") === "green") {
      tasks[i].style.display = "block";
    }
  }
})

document.querySelector('#filter-blue').addEventListener("click", function () {
  var tasks = document.querySelectorAll(".task .desc");
  for (i = 0; i < tasks.length; i++){
    tasks[i].style.display = "none";
  }
  for (i = 0; i < tasks.length; i++){
    if (tasks[i].getAttribute("color") === "blue") {
      tasks[i].style.display = "block";
    }
  }
})

document.querySelector('#remove-filter').addEventListener("click", function () {
  var tasks = document.querySelectorAll(".task .desc");
  for (i = 0; i < tasks.length; i++){
    tasks[i].style.display = "block";
  }
})

function addTask(name) {
  var desc = document.createElement('div');
  desc.className = "desc";

  var row = document.createElement('div');
  row.className = "row";

  var nameValue = document.createElement('div');
  nameValue.className = "col-8";
  nameValue.className += " col-sm-8";
  nameValue.className += " col-md-10";
  nameValue.innerHTML = name;
  nameValue.style.color = color;

  firstButtonContainer = document.createElement('div');
  firstButtonContainer.className = 'col-1';
  firstButtonContainer.className += ' col-sm-1';
  firstButtonContainer.className += ' col-md-1';
  firstButton = document.createElement('button');
  firstButton.className = 'btn';
  firstButton.className += ' btn-sm';
  firstButton.className += ' btn-light';
  firstButton.className += ' pin';
  iconForFirstButton = document.createElement('i');
  iconForFirstButton.className = 'fa';
  iconForFirstButton.className += ' fa-map-pin';
  firstButton.addEventListener('click', pinFunc);
  firstButton.appendChild(iconForFirstButton);
  firstButtonContainer.appendChild(firstButton);

  secondButtonContainer = document.createElement('div');
  secondButtonContainer.className = 'col-1';
  secondButtonContainer.className += ' col-sm-1';
  secondButtonContainer.className += ' col-md-1';
  secondButtonContainer.className += ' pl-2'; 
  secondButton = document.createElement('button');
  secondButton.className = 'btn';
  secondButton.className += ' btn-sm';
  secondButton.className += ' btn-light';
  secondButton.className += ' done';
  iconForSecondButton = document.createElement('i');
  iconForSecondButton.className = 'fa';
  iconForSecondButton.className += ' fa-check';
  secondButton.addEventListener('click', doneFunc);
  secondButton.appendChild(iconForSecondButton);
  secondButtonContainer.appendChild(secondButton);

  row.appendChild(nameValue);
  row.appendChild(firstButtonContainer);
  row.appendChild(secondButtonContainer);
  desc.setAttribute("color", color);
  desc.appendChild(row);
  return desc;
}

function pinFunc() {
  var item = this.parentNode.parentNode.parentNode;
  var parent = item.parentNode;
  pinning(parent, item);
}

function secondPinFunc() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  pinning(parent,item)   
}

function pinning(parent, item) {
  prioritySection = parent.getAttribute('class').split(" ")[2];
  if (prioritySection === 'high-container') {
    let pinList = document.querySelector(".high-container-pin");
    pinList.appendChild(item.cloneNode(true));
    btnWrapper = pinList.lastElementChild.lastElementChild;
    btnWrapper.children[1].addEventListener('click', unpin);
    btnWrapper.children[1].style.color = "red";
    btnWrapper.children[2].addEventListener('click', secondDoneFunc);

  }
  else if (prioritySection === 'medium-container') {
    let pinList = document.querySelector(".medium-container-pin");
    pinList.appendChild(item.cloneNode(true));
    btnWrapper = pinList.lastElementChild.lastElementChild;
    btnWrapper.children[1].addEventListener('click', unpin);
    btnWrapper.children[2].addEventListener('click', secondDoneFunc);

  }
  else if (prioritySection === 'low-container') {
    let pinList = document.querySelector(".low-container-pin");
    pinList.appendChild(item.cloneNode(true));
    btnWrapper = pinList.lastElementChild.lastElementChild;
    btnWrapper.children[1].addEventListener('click', unpin);
    btnWrapper.children[2].addEventListener('click', secondDoneFunc);
  }
  parent.removeChild(item);
}

function unpin() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
    
  prioritySection = parent.getAttribute('class').split(" ")[2];
  if (prioritySection === 'high-container-pin') {
    let pinList = document.querySelector(".high-container");
    pinList.appendChild(item.cloneNode(true));
    btnWrapper = pinList.lastElementChild.lastElementChild;
    btnWrapper.children[1].addEventListener('click', secondPinFunc);
    btnWrapper.children[2].addEventListener('click', secondDoneFunc);

  }
  else if (prioritySection === 'medium-container-pin') {
    let pinList = document.querySelector(".medium-container");
    pinList.appendChild(item.cloneNode(true));
    btnWrapper = pinList.lastElementChild.lastElementChild;
    btnWrapper.children[1].addEventListener('click', secondPinFunc);
    btnWrapper.children[2].addEventListener('click', secondDoneFunc);
  }
  else if (prioritySection === 'low-container-pin') {
    let pinList = document.querySelector(".low-container");
    pinList.appendChild(item.cloneNode(true));
    btnWrapper = pinList.lastElementChild.lastElementChild;
    btnWrapper.children[1].addEventListener('click', secondPinFunc);
    btnWrapper.children[2].addEventListener('click', secondDoneFunc);
  }
  parent.removeChild(item);
}

function doneFunc() {
  var item = this.parentNode.parentNode.parentNode;
  var parent = item.parentNode;
  donning(parent, item);
}

function secondDoneFunc() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  donning(parent, item);
}

function donning(parent, item) {
  prioritySection = parent.getAttribute('class').split(" ")[2];

  clonedTask = item.cloneNode(true);
  inner = clonedTask.lastElementChild;
  firstButton = clonedTask.lastElementChild.lastElementChild;
  inner.removeChild(firstButton);
  
  secondButton = clonedTask.lastElementChild.children[1];
  inner.removeChild(secondButton);
  text = clonedTask.lastElementChild.children[0];
  text.style.textDecoration = "line-through";

  secondButtonContainer = document.createElement('div');
  secondButtonContainer.className = 'col-2';
  secondButton = document.createElement('button');
  secondButton.className = 'btn';
  secondButton.className += ' btn-sm';
  secondButton.className += ' btn-light';
  iconForSecondButton = document.createElement('i');
  iconForSecondButton.className = 'fa';
  iconForSecondButton.className += ' fa-times';
  secondButton.addEventListener('click', undone);
  secondButton.appendChild(iconForSecondButton);
  clonedTask.lastElementChild.appendChild(secondButton);
  if (prioritySection === 'high-container' || prioritySection === 'high-container-pin') {
    let doneList = document.querySelector('.high-container-done');
    doneList.appendChild(clonedTask);
  }
  else if (prioritySection === 'medium-container' || prioritySection === 'medium-container-pin') {
    let doneList = document.querySelector('.medium-container-done');
    doneList.appendChild(clonedTask);
  }
  else if (prioritySection === 'low-container' || prioritySection === 'low-container-pin') {
    let doneList = document.querySelector('.low-container-done');
    doneList.appendChild(clonedTask);
  }

  parent.removeChild(item);
}

function undone() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  prioritySection = parent.getAttribute('class').split(" ")[2];
  clonedTask = item.cloneNode(true);
  inner = clonedTask.lastElementChild;
  inner.removeChild(clonedTask.lastElementChild.lastElementChild);
  inner.lastElementChild.style.textDecoration = "none";

  firstButtonContainer = document.createElement('div');
  firstButtonContainer.className = 'col-1';
  firstButton = document.createElement('button');
  firstButton.className = 'btn';
  firstButton.className += ' btn-sm';
  firstButton.className += ' btn-light';
  firstButton.className += ' pin';
  iconForFirstButton = document.createElement('i');
  iconForFirstButton.className = 'fa';
  iconForFirstButton.className += ' fa-map-pin';
  firstButton.addEventListener('click', pinFunc);
  firstButton.appendChild(iconForFirstButton);
  firstButtonContainer.appendChild(firstButton);

  secondButtonContainer = document.createElement('div');
  secondButtonContainer.className = 'col-1';
  secondButtonContainer.className += ' pl-2';
  secondButton = document.createElement('button');
  secondButton.className = 'btn';
  secondButton.className += ' btn-sm';
  secondButton.className += ' btn-light';
  secondButton.className += ' done';
  iconForSecondButton = document.createElement('i');
  iconForSecondButton.className = 'fa';
  iconForSecondButton.className += ' fa-check';
  secondButton.addEventListener('click', doneFunc);
  secondButton.appendChild(iconForSecondButton);
  secondButtonContainer.appendChild(secondButton);
  clonedTask.lastElementChild.appendChild(firstButtonContainer);
  clonedTask.lastElementChild.appendChild(secondButtonContainer);

  if (prioritySection === 'high-container-done') {
    let list = document.querySelector(".high-container");
    list.appendChild(clonedTask);
  }
  else if (prioritySection === 'medium-container-done') {
    let list = document.querySelector(".medium-container");
    list.appendChild(clonedTask);
  }
  else if (prioritySection === 'low-container-done') {
    let list = document.querySelector(".low-container");
    list.appendChild(clonedTask);
  }
  parent.removeChild(item);
}

