const btn = document.querySelector ('.price__composition-pic');
const hidden = document.querySelector ('.price__composition-table');

btn.addEventListener ('mouseenter', function (params) {
    
    hidden.style.display = 'table';

});

btn.addEventListener ('mouseleave', function (params) {
    
    hidden.style.display = 'none';

});