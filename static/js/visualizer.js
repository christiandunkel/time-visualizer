let html = document.getElementsByTagName('html')[0];

// dark mode

let darkmode = false;
document.getElementById('toggle-darkmode').addEventListener('click', function () {
    // toggle darkmode value
    darkmode = !darkmode;
    // toggle darkmode class according to value
    html.classList[darkmode ? 'add' : 'remove']('darkMode');
});