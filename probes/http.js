module.exports = function (facets, req) {
  var target = facets.target;

  switch (target) {
  case 'begin':
    req._start = Date.now();
    break;
  case 'end':
    console.log('request:', req.url, Date.now() - req._start);
    break;
  };

};
