
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

    result.forEach((data) => {
        Object.entries(data).forEach(([key, val]) => {
            let header = createThElement(key, 'header');
            let value = createTdElement(val, 'rowData');

            header.appendChild(value);
            root.appendChild(header);
        })
    });

    // appends <thead> and <tbody> into <table>
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
}

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







