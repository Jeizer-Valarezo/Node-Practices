"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;

var planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];

var getAll = function (req, res) {
    res.json(planets);
};
exports.getAll = getAll;
var getOneById = function (req, res) {
    var planet = planets.find(function (p) { return p.id === parseInt(req.params.id); });
    if (!planet) {
        return res.status(404).json({ error: 'Planet not found' });
    }
    res.json(planet);
};
exports.getOneById = getOneById;
var create = function (req, res) {
    var name = req.body.name;
    var id = planets.length + 1;
    planets.push({ id: id, name: name });
    res.status(201).json({ msg: 'Planet created successfully' });
};
exports.create = create;
var updateById = function (req, res) {
    var id = req.params.id;
    var planetIndex = planets.findIndex(function (p) { return p.id === parseInt(id); });
    if (planetIndex === -1) {
        return res.status(404).json({ error: 'Planet not found' });
    }
    planets[planetIndex].name = req.body.name;
    res.status(200).json({ msg: 'Planet updated successfully' });
};
exports.updateById = updateById;
var deleteById = function (req, res) {
    var id = req.params.id;
    var planetIndex = planets.findIndex(function (p) { return p.id === parseInt(id); });
    if (planetIndex === -1) {
        return res.status(404).json({ error: 'Planet not found' });
    }
    planets.splice(planetIndex, 1);
    res.status(200).json({ msg: 'Planet deleted successfully' });
};
exports.deleteById = deleteById;
