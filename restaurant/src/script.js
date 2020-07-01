/** Add any JavaScript you need to this file. */


document.querySelector('#img-item').addEventListener('click', 
function(e){
  document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function(){
  document.querySelector('.bg-modal').style.display = 'none';
});


// function hideLists() {
//   let gardenProducts = document.getElementsByClassName('garden');
//   Object.entries(gardenProducts).forEach(entry => {
//     entry[1].style.display = 'none';
//   });
// }

// function showLists(productCard) {
//   let gardenProduct = document.getElementById(productCard);
//   gardenProduct.style.display = 'block';
// }

// function setupMenuHandlers() {
//   document.getElementById('tree-link').addEventListener('click', function() {
//     hideLists();
//     showLists('tree-cards');
//   });

//   document.getElementById('flower-link').addEventListener('click', function() {
//     hideLists();
//     showLists('flower-cards');
//   });

//   document.getElementById('produce-link').addEventListener('click', function() {
//     hideLists();
//     showLists('produce-cards');
//   });

//   document.getElementById('tool-link').addEventListener('click', function() {
//     hideLists();
//     showLists('tool-cards');
//   });
// }

// function onClickMenu() {
//   document.getElementById('menu-bar').classList.toggle('change');
//   document.getElementById('nav').classList.toggle('change-btn');
// }

// window.onload = function() {
//   setupMenuHandlers();
// };
