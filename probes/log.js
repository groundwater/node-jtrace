module.exports = function (facets, values) {
  var level;
  if (this.level === undefined) level = 0777;
  else level = parseInt(this.level, 8);

  if (level & facets.level)
  if (this.module && facets.module.join('/') !== this.module) {}
  else
  console.log(facets.module.join('/'), facets.target, values);
};
