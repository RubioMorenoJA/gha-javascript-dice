const core = require('@actions/core');
const github = require('@actions/github');

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

try {
    const initTime = new Date();
    const payloadEvent = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payloadEvent}`);
    
    const diceOrder = core.getInput('dice-order');
    console.log(`Dice order: ${diceOrder}`);
    core.setOutput('dice1', rollDice());
    if (diceOrder === 'two') {
        core.setOutput('dice2', rollDice());
    }

    const timeElapsed = (new Date() - initTime)/1000;
    console.log(`Time elapsed (s): ${timeElapsed}`);
    core.setOutput('time', timeElapsed);
} catch (error) {
    core.setFailed(error.message);
}