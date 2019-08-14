let html = _.tag('html')[0];

// dark mode

let darkmode = false;
_.id('toggle-darkmode').addEventListener('click', function () {
    // toggle darkmode value
    darkmode = !darkmode;
    // toggle darkmode class according to value
    html.classList[darkmode ? 'add' : 'remove']('darkMode');
});