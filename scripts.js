function getIphones(term) {
  // use the fetch API to load iphones.json
  // after this has loaded call the filterIphones() function below to filter the results

  const url = "/iphones.json";
  
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
  	filterIphones(data, term)
  })
  .catch(function(error) {
    console.log(error);
  })
}

function filterIphones(iphones, searchTerm) {
  const filteredIphones = iphones.filter(function(iphone) { 
    // filter the iphone
    return iphone.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
          iphone.color.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
          iphone.capacity.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
          iphone.price <= searchTerm
  }) 
  displayFilteredIphones(filteredIphones)
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function displayFilteredIphones(iphones) {
  // take a list of filtered iphones and output them to the <div id="results"></div> in the browser
  //console.log(iphones);
  const res = document.getElementById('results');
  res.innerHTML = '<div class="loader"></div>';

  if(iphones.length > 1){
    res.innerHTML = '';
    iphones.map(function(iphone) {
      let div1 = createNode('div'),
          h2 = createNode('h2'),
          divfeat = createNode('div'),
          spanfeat1 = createNode('span'),
          spanfeat2 = createNode('span'),
          divprice = createNode('div');
          pfeat1 = createNode('p'),
          pfeat2 = createNode('p'),
      div1.setAttribute('class', 'resultBlock');
      h2.innerHTML = `${iphone.name}`;
      pfeat1.innerHTML = `<span>Color</span>${iphone.color}`;
      pfeat2.innerHTML = `<span>Storage</span>${iphone.capacity}`;
      divprice.innerHTML = `$${iphone.price}`;
      divprice.setAttribute('class', 'price');
      divfeat.setAttribute('class', 'features');
      append(div1, h2);
      //append(pfeat1, spanfeat1);
      //append(pfeat2, spanfeat2);
      append(divfeat, pfeat1);
      append(divfeat, pfeat2);
      append(div1, divfeat);
      append(div1, divprice);
      append(res, div1);
    });

  }else{
    res.innerHTML = '<p>Sorry, we couldn\'t find any results. Please try again. </p>';
  }
}
