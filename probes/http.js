module.exports.event = function (facets, req) {
  var action = facets.action;

  switch (action) {
  case 'begin':
    req._start = Date.now();
    break;
  case 'end':
    console.log('request:', req.url, Date.now() - req._start);
    break;
  };

};
