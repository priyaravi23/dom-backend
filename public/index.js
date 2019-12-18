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

    attachSortHandlers();
}

function renderTable(root, data) {
    const result = data;
    // get the reference for the body
    const body = document.getElementsByTagName("body")[0];

    // creates <table> , <thead> and <tbody> elements
    const tbl = document.createElement("table");
    const tblHead = document.createElement("thead");
    const tblBody = document.createElement("tbody");

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
    const tr = document.createElement('tr');

    results.forEach(review => {
        Object.keys(review).forEach(prop => set.add(prop));
    });
    const headings = [...set];
    // create headings for each and append
    headings.forEach(heading => {
        const header = createThElement(heading, '', heading);
        tr.appendChild(header);
        thead.appendChild(tr);
    });
};

const renderRows = (results, tbody) => {
    results.forEach(review => {
        const tr = document.createElement('tr');
        const tds = Object.values(review).forEach(val => {
            tr.appendChild(createTdElement(val));
        });
        tbody.appendChild(tr);
        tr.appendChild(createTdElement(tds));
    });
};

const createThElement = (str, className, prop) => {
    var th = document.createElement('th');
    th.setAttribute('class', className);
    th.setAttribute('data-prop', prop);
    th.innerHTML = str;
    return th;
};

const createTdElement = (str, className) => {
    var td = document.createElement('td');
    td.setAttribute('class', className);
    td.innerHTML = str;
    return td;
};

function sortBy(results, prop, asc) {
    let sortedData = [...results];

    // sort fn
    if (asc) {
        sortedData.sort(compareFnAsc.bind(null, prop));
    } else {
        sortedData.sort(compareFnDesc.bind(null, prop));
    }

    return sortedData;
}

function compareFnAsc(prop, a, b) {
    if (a[prop] > b[prop]) return 1;
    else if (a[prop] < b[prop]) return -1;
    else return 0;
}

function compareFnDesc(prop, a, b) {
    if (a[prop] > b[prop]) return -1;
    else if (a[prop] < b[prop]) return 1;
    else return 0;
}

function attachSortHandlers(results, thead) {
    // const tableHeaders = renderHeadings(results, thead);
    const tableHeaders = Array.from(document.querySelectorAll('thead th'));

    tableHeaders.forEach((th, index) => {
        const prop = th.dataset.prop;
        let sortState = ;

        const thClickHandler = () => {
            const newSortState = !sortState;
            sortState = newSortState;
            const newOrder = sortBy(results, prop, newSortState);
            renderRows(newOrder);
            th.querySelector('span').innerHTML = newSortState ? '(asc)' : '(desc)';
        };

        th.addEventListener('click', thClickHandler);
    });
}