module.exports = function (level, provider, args) {
  if (level < this.level) return;

  for(var p in this.providers) {
    var prov = this.providers[p];
    if (provider === prov) return log(name(level), provider, args.join(" "))
  }

  if (this.providers.length === 0)
    log(name(level), provider, args.join(" "))
};
