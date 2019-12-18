
document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    const promise = fetch('/wine-reviews');

    promise.then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                const root = document.querySelector('.container');
                renderTable(root, data);
            })
        }
    }, (err) => {
        console.log(err);
    });
}

function renderTable(root, data) {
    const result = data;
    // get the reference for the body
    const body = document.getElementsByTagName("body")[0];

    // creates <table> , <thead> and <tbody> elements
    const tbl = document.createElement("table");
    const tblHead = document.createElement("thead");
    const tblBody = document.createElement("tbody");

    // I don't follow what we are doing here??!!

  renderHeadings(result, tblHead);
  renderRows(result, tblBody);


    // appends <thead> and <tbody> into <table>
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
}

const renderHeadings = (results, thead) => {
    const set = new Set();
    results.forEach(review => {
        Object.keys(review).forEach(prop => set.add(prop));
    });
    const headings = [...set];
    console.log(headings);
    // create headings for each and append
};

const renderRows = (results, tbody) => {
  results.forEach(review => {
    const tr = createTr();
    const tds = Object.values(review).forEach(val => {
      tr.appendChild(createTdElement(val));
    });
    // append the tr to tbody
  });
  // create a tr eleement
  console.log(headings);
  // create headings for each and append
};

const createThElement = (str, className) => {
    var column = document.createElement('th');
    column.setAttribute('class', className);
    column.innerHTML = str;
    return column;
};

const createTdElement = (str, className) => {
    var row = document.createElement('td');
    row.setAttribute('class', className);
    row.innerHTML = str;
    return row;
};







