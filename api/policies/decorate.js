module.exports = function(req, res, next) {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    req.options.locals = req.options.locals || {};

    var viewVariables = {
        currentUser: req.user.name,
        controller: req.options.controller.capitalize(),
        action: req.options.action.capitalize(),
        errors: req.flash('error')
    };

    _.extend(req.options.locals, viewVariables);

    return next();
};