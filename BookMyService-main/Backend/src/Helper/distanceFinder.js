const deg2rad = require('deg2rad')
function getDistanceBetweenPoints(lat1, lng1, lat2, lng2) {
    const theta = lng1 - lng2;
    var miles = (Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2))) + (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta)));
    miles = Math.acos(miles);
    distance = (miles / Math.PI) * 180;
    miles = distance * 60 * 1.1515;
    var feet = miles * 5280;
    kilometers = miles * 1.609344;
    meters = kilometers * 1000;
    
    return Math.round(kilometers);
}
module.exports =  getDistanceBetweenPoints