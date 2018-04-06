Array.prototype.last = function () {
    if (this.length - 1 >= 0)
        return this[this.length - 1]
    return ''
}

Array.prototype.clear = function () {
    this.splice(0, this.length)
}