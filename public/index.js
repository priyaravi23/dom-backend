const model = {
    headings: {
        // propName: { sortState: 'asc', label: propName }
    },
    sortProp: undefined // price
};

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
                // perform the model initialization
                postDataAccess(data);
                console.log(model);
                renderTable();
                // Attach sort handlers here
                attachSortHandlers(model);
            })
        }
    }, (err) => {
        console.log(err);
    });

}

/** Start utility functions */
const getGetHeadingsFromData = reviewsArr => {
    const set = new Set();
    reviewsArr.forEach(review => {
        Object.keys(review).forEach(prop => set.add(prop));
    });
    return [...set];
};

function sortBy(newReviewsArr, prop, asc) {
    // sort fn
    if (asc) {
        newReviewsArr.sort(compareFnAsc.bind(null, prop));
    } else {
        newReviewsArr.sort(compareFnDesc.bind(null, prop));
    }
    return newReviewsArr;
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

const createThElement = (str, className, prop) => {
    var th = document.createElement('th');
    th.setAttribute('class', className);
    th.setAttribute('data-prop', prop);
    th.innerHTML = `${str} `;
    return th;
};
const createTdElement = (str, className) => {
    var td = document.createElement('td');
    td.setAttribute('class', className);
    td.innerHTML = str;
    return td;
};
/** End utility functions */


/** Event handlers / Data callbacks
 * @desc This function runs after we receive data from the backend
 * */

function postDataAccess(reviewsArr) {
    const headings = getGetHeadingsFromData(reviewsArr);
    // model.sortState = { 'region_1': undefined / 'asc' / 'desc' }
    model.headings = headings.reduce((sortState, heading) => {
        sortState[heading] = {
            sortState: undefined,
            label: heading
        };
        return sortState;
    }, {});
    model.reviews = reviewsArr;
}

function attachSortHandlers() {
    // const tableHeaders = renderHeadings(results, thead);
    const ths = Array.from(document.querySelectorAll('thead th'));

    const clickHandler = (e) => {
        const {prop} = e.target.dataset;
        console.log(prop);
        model.headings[prop].sortState = !model.headings[prop].sortState;
        model.sortProp = prop;
        console.time('sort');
        // updateThWithVisuals()
        // Create a new array
        const newReviewsArr = [...model.reviews];
        sortBy(newReviewsArr, prop, model.headings[prop].sortState);
        console.log(newReviewsArr.map(r => r.price));
        console.timeEnd('sort');
        console.time('render');
        updateHeadingsWithSortState();
        renderRows(newReviewsArr, document.querySelector('.container tbody'));
        console.timeEnd('render');
        console.log(model);
    };

    ths.forEach((th, index) => {
        const prop = th.dataset.prop;
        th.addEventListener('click', clickHandler)
    });
}

/** Start render code */
function renderTable() {
    const container = document.querySelector('.container');
    // creates <table> , <thead> and <tbody> elements
    const tblHead = container.querySelector("thead");
    const tblBody = container.querySelector("tbody");
    renderHeadings(model.headings, tblHead);
    renderRows(model.reviews, tblBody);
}

const renderHeadings = (headings, thead) => {
    thead.innerHTML = '';
    const tr = document.createElement('tr');
    // create headings for each and append
    Object.values(headings).forEach(headingObj => {
        const header = createThElement(headingObj.label.replace(/_/g, ' '), '', headingObj.label);
        tr.appendChild(header);
    });

    thead.appendChild(tr);
};

const renderRows = (reviews, tbody) => {
    tbody.innerHTML = '';
    reviews.forEach(review => {
        const tr = document.createElement('tr');

        Object.values(review).forEach(val => {
            tr.appendChild(createTdElement(val));
        });

        tbody.appendChild(tr);
    });
};

function updateHeadingsWithSortState() {
    const upArrow = '↑';
    const downArrow = '↓';
    document.querySelectorAll('.container thead th').forEach(th => {
        const {prop} = th.dataset;
        if (prop === model.sortProp) {
            const arrow = model.headings[prop].sortState ? upArrow : downArrow;
            th.innerHTML = model.headings[prop].label + `${arrow}`
        } else {
            th.innerHTML = model.headings[prop].label;
        }
    });
}
/** End render code */