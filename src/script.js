"use strict";
var subjects = 100;
function createSubjects(howManySubjects, lengthOfInput) {
    let subjects = [];
    for (let i = 0; i < howManySubjects; i++) {
        let adn = "";
        for (let j = 0; j < lengthOfInput.length; j++) {
            adn += String.fromCharCode(60 + Math.floor(Math.random() * 67));
        }
        subjects.push(adn);
    }
    return subjects;
}
// i fucking hate this function but i cant think in another way of making it 
function getTheBest(phrase, subjects) {
    let best = subjects[0];
    let bestCost = 100000;
    let bestIndex = 0;
    for (var i = 0; i < subjects.length; i++) {
        let maybeBetter = subjects[i];
        let maybeCost = 0;
        for (var j = 0; j < phrase.length; j++) {
            maybeCost += Math.abs(maybeBetter.charCodeAt(j) - phrase.charCodeAt(j));
        }
        if (maybeCost < bestCost) {
            best = maybeBetter;
            bestIndex = i;
            bestCost = maybeCost;
        }
    }
    return [best, bestCost];
}
function mutateSubjects(subjects, phrase) {
    let [theBest, _] = getTheBest(phrase, subjects);
    let newSubjects = [];
    for (let i = 0; i < subjects.length; i++) {
        newSubjects.push("");
        for (let j = 0; j < subjects[i].length; j++) {
            let char = theBest[j];
            if (Math.random() * 2 > 1.3) {
                char = String.fromCharCode(Math.round(theBest.charCodeAt(j) + [1, -1][Math.floor(Math.random() * 3 - 1)] * Math.random()));
            }
            newSubjects[i] += char;
        }
    }
    return newSubjects;
}
function main() {
    let subjects = mutateSubjects(createSubjects(10, "hello world"), "hello world");
    let generation = 0;
    let [bestBefore, bestCostBefore] = getTheBest("hello world", subjects);
    let interval = setInterval(() => {
        let subSubjects = mutateSubjects(subjects, "hello world");
        let [best, cost] = getTheBest("hello world", subSubjects);
        if (cost < bestCostBefore) {
            bestBefore = best;
            bestCostBefore = cost;
            subjects = subSubjects;
            console.log("abc");
        }
        console.log("--------------------------------");
        console.log("cost            :", cost);
        console.log("best            :", best);
        console.log("best before     :", bestBefore);
        console.log("best before cost:", bestCostBefore);
        console.log("generation      :", generation);
        generation++;
        if (cost == 0) {
            clearInterval(interval);
        }
    }, 100);
}
main();
