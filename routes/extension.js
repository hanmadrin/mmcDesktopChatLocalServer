const express = require('express');
const router = express.Router();
const robot = require("robotjs");
const ncp = require("copy-paste");


router.use('/test', async (req, res) => {
    console.log('new request');
    const sleep = async(ms) => {
        await new Promise(resolve => setTimeout(resolve, ms));
    };
    // robot.setKeyboardDelay(10);
    
    // set cursor position
    robot.moveMouse(1331,524);
    // left click
    robot.mouseClick();
    robot.typeString("Hello, A?H ? ");
    // get current mouse position
    // await sleep(5000);
    // const mouse = robot.getMousePos();
    // console.log(mouse);
    res.json({ message: 'test' })
    
});

router.post('/click', async (req, res) => {
    const clickPosition = req.body.position;
    console.log(`clickPosition : ${clickPosition.x}, ${clickPosition.y}`);
    robot.moveMouse(clickPosition.x,clickPosition.y);
    robot.mouseClick();
    res.json({ message: 'clicked' })
});
// type
router.post('/type', async (req, res) => {
    const text = req.body.text;
    console.log(`text : ${text}`);
    // ncp copy await promise
    await new Promise((resolve, reject) => {
        ncp.copy(`text\niosfh`, () => {
            resolve();
        });
    });
    robot.keyTap("v","control");
    res.json({ message: 'typed' })
});

router.post('/clickAndType', async (req, res) => {
    const position = req.body.position;
    const text = req.body.text;
    console.log(`text : ${text}`);
    console.log(`clickPosition : ${position.x}, ${position.y}`);
    robot.moveMouse(position.x,position.y);
    robot.mouseClick();
    await new Promise((resolve, reject) => {
        ncp.copy(text, () => {
            resolve();
        });
    });
    robot.keyTap("v","control");
    res.json({ message: 'clicked and typed' })
});

module.exports = router;