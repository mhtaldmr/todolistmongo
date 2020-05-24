//jshint esversion:6


// equivalent to the same thing with
// module.exports.getDate = getDate;
// function getDate(){
// #todo    
// }

//its good to use "const" variables in exported functions not to change the funcionality

exports.getDate = function () {

    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year : "numeric"
    };

    return today.toLocaleDateString("us-US", options);
};

exports.getDay = function () {

    const today = new Date();
    const options = {
        weekday: "long",
    };

    return today.toLocaleDateString("us-US", options);
};