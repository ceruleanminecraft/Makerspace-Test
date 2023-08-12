const express = require('express');
const path = require('path');
const canvas = require('@napi-rs/canvas');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/page.html')));

app.get('/make', (req, res) => {
    try {
        let { background, name, catchletImg, level, hp, dmg, element, rarity } = req.query;

        const card = canvas.createCanvas(400, 600)
        const ctx = card.getContext('2d');

        let backgrounds = {
            blue: 'https://catchet.piootr.com/images/cardfront.png',
            yellow: 'https://media.discordapp.net/attachments/1002766936553308190/1136051119769006180/image.png?width=598&height=898'
        }

        canvas.loadImage(backgrounds[background]).then((image) => {
            ctx.drawImage(image, 0, 0);
            ctx.font = '600 45px DM Sans'
            ctx.fillStyle = '#fff'
            ctx.strokeStyle = 'rgba(0,0,0,0.7)'
            ctx.fillText(`${parseInt(hp).toLocaleString()}`, 110, 390)
            ctx.strokeText(`${parseInt(hp).toLocaleString()}`, 110, 390)
            ctx.fillText(`${parseInt(dmg).toLocaleString()}`, 110, 470)
            ctx.strokeText(`${parseInt(dmg).toLocaleString()}`, 110, 470)

            canvas.loadImage(catchletImg).then((image) => {
                ctx.drawImage(image, 100, 75, 230, 230)
                ctx.font = '700 25px DM Sans'
                ctx.strokeStyle = 'rgba(0,0,0,0.3)'
                ctx.fillText(name, 66, 50)
                ctx.strokeText(name, 66, 50)

                canvas.loadImage(element).then((image) => {
                    ctx.drawImage(image, 30, 27.5, 30, 28)
                    ctx.font = '800 20px DM Sans'
                    ctx.strokeStyle = 'rgba(0,0,0,0.3)'
                    ctx.fillText(rarity, 25, 570)
                    ctx.strokeText(rarity, 25, 570)
                    ctx.fillText(`Level: ${parseInt(level).toLocaleString()}`, 30, 80)
                    ctx.strokeText(`Level: ${parseInt(level).toLocaleString()}`, 30, 80)

                    canvas.loadImage(`https://catchet.piootr.com/images/icons/heart.png`).then((image) => {
                        ctx.drawImage(image, 50, 353.5, 45, 45)

                        canvas.loadImage(`https://catchet.piootr.com/images/icons/sword.png`).then((image) => {
                            ctx.drawImage(image, 50, 433.5, 45, 45)
                            res.send({
                                success: true,
                                card: card.toDataURL()
                            });
                        });
                    });
                });
            });
        });
    } catch (err) {
        res.send({
            success: false,
            reason: err
        });
    };
});

app.listen(1203, () => {
    console.clear();
    console.log(`Running on http://localhost:1203`);
});
