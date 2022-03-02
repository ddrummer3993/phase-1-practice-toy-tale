let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// GET request to fetch all toy objects

document.addEventListener("DOMContentLoaded", fetchToyData())

function fetchToyData() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => {
    toyObjArray = data.map(obj => createCard(obj));
  });
}

//create a toy card

function createCard(obj) {
  let card = document.createElement('div');
  card.classList.add('class');

  let toyName = document.createElement('h2');
  toyName.innerText = obj.name;
  
  let toyImg = document.createElement('img');
  toyImg.src = obj.image;
  toyImg.classList.add('toy-avatar');
  
  let toyLikes = document.createElement('p');
  toyLikes.innerText = obj.likes + ' likes';
 
  let toyLikeBtn = document.createElement('button');
  toyLikeBtn.classList.add('like-btn');
  toyLikeBtn.id = obj.id;
  toyLikeBtn.innerText = 'like ♥'
  toyLikeBtn.addEventListener('click', () => {
    obj.likes += 1
    returnValue = updateToyLikes(obj);
    if (returnValue = 'success') {
      toyLikes.innerText = obj.likes + ' likes';
    }
  });
  
  card.appendChild(toyName);
  card.appendChild(toyImg);
  card.appendChild(toyLikes);
  card.appendChild(toyLikeBtn);

  document.querySelector("#toy-collection").appendChild(card);
}

//POST request - create function(s) to handle submit of new toy info

document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  };
  postNewToy(toyObj);
};

function postNewToy(toyObj) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(data => {
    if (data) {
      createCard(data);
    }
  });
}

//PATCH request to update toy likes --- event listener & DOM update has been added to each button in createCard() function

function updateToyLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(data => {
    if (data) {
      return 'success';
    }
  });
}


//add toy data for babyface
// name: Babyface
//URL: https://static.wikia.nocookie.net/pixar/images/8/8c/Babyface.jpg/revision/latest/scale-to-width-down/550?cb=20111206021132