"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
function createSubjects(howManySubjects, lengthOfInput) {
    // im just creating some subjects
    let subjects = [];
    for (let i = 0; i < howManySubjects; i++) {
        let dna = "";
        // i know that this is really shitty but i dont have time to make it better
        // its just a simple random string generator and it works for making the "dna"
        for (let j = 0; j < lengthOfInput.length; j++) {
            dna += String.fromCharCode(90 + Math.floor(Math.random() * 37));
        }
        subjects.push(dna);
    }
    return subjects;
}
// i fucking hate this function but i cant think in another way of making it 
function getTheBest(phrase, subjects) {
    let best = subjects[0]; // so yeah 
    let bestCost = 0;
    for (var i = 0; i < subjects.length; i++) {
        let maybeBetter = subjects[i];
        let maybeCost = 0;
        // i just need to know the cost with that i only need to make this
        for (var j = 0; j < phrase.length; j++) {
            maybeCost += Math.abs(maybeBetter.charCodeAt(j) - phrase.charCodeAt(j));
        }
        if (maybeCost < bestCost || i == 0) {
            best = maybeBetter;
            bestCost = maybeCost;
        }
    }
    return [best, bestCost];
}
function mutateSubjects(subjects, phrase) {
    let [theBest, _] = getTheBest(phrase, subjects);
    // i create a new array with the same length as the subjects
    let newSubjects = [];
    for (let i = 0; i < subjects.length; i++) {
        newSubjects.push("");
        for (let j = 0; j < subjects[i].length; j++) {
            let char = theBest[j];
            // it works randomnly 
            if (Math.random() * 2 > 1.3) {
                char = String.fromCharCode(// i just generate a random char
                Math.round(
                // maybe im adding , maybe im substracting
                theBest.charCodeAt(j) + [1, -1][Math.round(Math.random() * 2)] * Math.random()));
            }
            newSubjects[i] += char;
        }
    }
    return newSubjects;
}
function main() {
    let phrase = "me culie a tu abuela";
    let subjects = mutateSubjects(createSubjects(60, phrase), phrase);
    let generation = 1;
    let [bestBefore, bestCostBefore] = getTheBest(phrase, subjects);
    let interval = setInterval(() => {
        let subSubjects = mutateSubjects(subjects, phrase);
        let [best, cost] = getTheBest(phrase, subSubjects);
        if (cost < bestCostBefore) {
            bestBefore = best;
            bestCostBefore = cost;
            subjects = subSubjects;
        }
        process_1.stdout.write(`\r${best.split("").filter(c => ![6, 10].includes(c.charCodeAt(0))).join("")} ${cost} ${best.split("").map(i => i.charCodeAt(0))} `);
        generation++;
        if (cost == 0) {
            clearInterval(interval);
        }
    }, 100);
}
main();
