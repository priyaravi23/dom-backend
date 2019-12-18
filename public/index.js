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
  const container = document.querySelector('.container');

  // creates <table> , <thead> and <tbody> elements
  const table = createElement({tagName: 'table', className: 'reviews'});
  const thead = createElement({tagName: 'thead'});
  const tbody = createElement({tagName: 'tbody'});

  // I don't follow what we are doing here??!!

  renderHeadings(result, thead);
  renderRows(result, tbody);

  container.innerHTML = '';
  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(table)
}

const renderHeadings = (results, thead) => {
  const set = new Set();
  results.forEach(review => {
    Object.keys(review).forEach(prop => set.add(prop));
  });
  const headings = [...set];
  const tr = document.createElement('tr');
  headings.forEach(heading => {
    tr.appendChild(createElement({
      tagName: 'th',
      innerHTML: heading
    }))
  });
  thead.innerHTML = '';
  thead.appendChild(tr);
};

const renderRows = (results, tbody) => {
  results.forEach(review => {
    const tr = document.createElement('tr');
    Object.values(review).forEach(val => {
      tr.appendChild(createElement({
        tagName: 'td',
        innerHTML: val
      }));
    });
    tbody.appendChild(tr);
  });
};

const createElement = (props) => {
  if (typeof props === 'string') {
    return document.createElement(props);
  }
  const {
    className,
    innerHTML,
    tagName
  } = props;
  const elem = document.createElement(tagName);
  innerHTML && (elem.innerHTML = innerHTML);
  className && elem.classList.add(className);
  return elem;
};







