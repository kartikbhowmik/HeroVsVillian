// -- All Variables :
const leftBtn = document.querySelector('#leftBtn');
const topBtn = document.querySelector('#topBtn');
const startBtn = document.querySelector('#startBtn');
const downBtn = document.querySelector('#downBtn');
const rightBtn = document.querySelector('#rightBtn');
const hero = document.querySelector('#hero');
const villian = document.querySelector('#villian');
let isGameStop = true;
let setTimeOut1;
let setInterval1;
const gameOverBox = document.querySelector('#gameOver');
let score = 0;
let cross = true;
let hiScoreVal = localStorage.getItem('HVVGHiScore');
let isDarkAble = true;
const darkBtn = document.querySelector('#darkBtn');
const body = document.querySelector('body');
const scoreCont = document.querySelector('#score');
const HiScoreCont = document.querySelector('#hiScore');
const gameName = document.querySelector('#gameName');
const gameCont = document.querySelector('#gameCont');
const allBtn = document.querySelectorAll('.btn');
const allBtnArr = Array.from(allBtn);
const reloadBtn = document.querySelector('#reloadBtn');
let setInterval2;
let scoreCompleted = false;
const gameSound = new Audio('music.mp3');



// -- All Functions :
function villianRun(order) {
        if (order == 'run') {
                villian.classList.add('villianAnim');
        } else if (order == 'stop') {
                villian.classList.remove('villianAnim');
        }
}

function gameFun() {
        setInterval1 = setInterval(() => {
                //console.log('game fun running..');
                hiScoreVal = localStorage.getItem('HVVGHiScore');
                if (hiScoreVal == null) {
                        hiScoreVal = 0;
                } else {
                        hiScoreVal = localStorage.getItem('HVVGHiScore');
                }

                let heroLeftVal = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
                let heroBottomVal = parseInt(window.getComputedStyle(hero, null).getPropertyValue('bottom'));
                let villianLeftVal = parseInt(window.getComputedStyle(villian, null).getPropertyValue('left'));
                let villianBottomVal = parseInt(window.getComputedStyle(villian, null).getPropertyValue('bottom'));

                let offsetLeft = Math.abs(heroLeftVal - villianLeftVal);
                let offsetBottom = Math.abs(heroBottomVal - villianBottomVal);
                heroRightVal = parseInt(window.getComputedStyle(hero, null).getPropertyValue('right'));

                if ((offsetLeft < 49 && offsetBottom < 40) || (heroLeftVal < -40 || heroRightVal < -40)) {
                        villianRun('stop');
                        isGameStop = true;
                        clearInterval(setInterval1);
                        gameOverBox.innerHTML = `Game Over <br> ${score} / ${hiScoreVal}`;
                        gameOverBox.classList.remove('dNone');
                        hero.style.left = '10px';
                        score = 0;
                        updateScore(score);

                        clearInterval(setInterval2);
                        gameSound.pause();

                } else if (offsetLeft < 30 && cross) {
                        cross = false;
                        score += 10;
                        updateScore(score);
                        setTimeout(() => {
                                cross = true;
                        }, 200)

                        //console.log(hiScoreVal);
                        if (score > hiScoreVal) {
                                localStorage.setItem('HVVGHiScore', JSON.stringify(score));
                                updateHiScore();
                        }
                }

        }, 200)
}

function updateScore(givenScore) {
        let scoreValCont = document.querySelector('#scoreCont');
        scoreValCont.innerHTML = givenScore;
}

function updateHiScore() {
        let hiScoreValCont = document.querySelector('#hiScoreCont');
        let hiScoreLS = localStorage.getItem('HVVGHiScore');
        if (hiScoreLS == null) {
                hiScoreLS = 0;
        } else {
                hiScoreLS = localStorage.getItem('HVVGHiScore');
        }
        hiScoreValCont.innerHTML = hiScoreLS;
}
updateHiScore();

function villianSpeed(speed, timeToHoldTheVillian) {
        scoreCompleted = true;
        villian.classList.remove('villianAnim');
        villian.style.animationDuration = speed;
        setTimeout(() => {
                villian.classList.add('villianAnim');
        }, timeToHoldTheVillian)
        setTimeout(() => {
                scoreCompleted = false;
        }, 2000)
}

function lavelUp() {
        setInterval2 = setInterval(() => {
                // console.log('lavelUp running..');
                if (score == 50 && !scoreCompleted) {
                        villianSpeed('1.9s', '100')
                }
                else if (score === 100 && !scoreCompleted) {
                        villianSpeed('1.8s', '100')
                }
                else if (score === 150 && !scoreCompleted) {
                        villianSpeed('1.7s', '100')
                }
                else if (score === 200 && !scoreCompleted) {
                        villianSpeed('1.6s', '100')
                }
                else if (score === 250 && !scoreCompleted) {
                        villianSpeed('1.5s', '100')
                }
                else if (score === 300 && !scoreCompleted) {
                        villianSpeed('1.4s', '100')
                }
                else if (score === 350 && !scoreCompleted) {
                        villianSpeed('1.3s', '100')
                }
                else if (score === 400 && !scoreCompleted) {
                        villianSpeed('1.2s', '100')
                }
                else if (score === 450 && !scoreCompleted) {
                        villianSpeed('1.1s', '100')
                }
                else if (score === 500 && !scoreCompleted) {
                        villianSpeed('1s', '100')
                }
        }, 500)
}



// -- All Buttons :
leftBtn.addEventListener('click', () => {
        if (!isGameStop) {
                let heroLeftVal = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
                let newLeftVal = (heroLeftVal - 20) + 'px';
                hero.style.left = newLeftVal;
        }
});

topBtn.addEventListener('click', () => {
        if (!isGameStop) {
                hero.classList.add('heroAnim');
                setTimeOut1 = setTimeout(() => {
                        hero.classList.remove('heroAnim');
                }, 1000)
        }
});

startBtn.addEventListener('click', () => {
        if (isGameStop) {
                villianRun('run');
                isGameStop = false;

                gameFun();
                // Hide The Game over Box when gameFun() is running:
                gameOverBox.classList.add('dNone');

                lavelUp();
                villian.style.animationDuration = '2s';
                gameSound.play();


        } else if (!isGameStop) {
                villianRun('stop');
                isGameStop = true;

                clearInterval(setInterval1);
                hero.style.left = '10px';
                score = 0;
                updateScore(score);
                clearInterval(setInterval2);
                villian.style.animationDuration = '2s';
                gameSound.pause();
        }
});

downBtn.addEventListener('click', () => {
        if (!isGameStop) {
                hero.classList.remove('heroAnim');
                clearTimeout(setTimeOut1);
        }
});

rightBtn.addEventListener('click', () => {
        if (!isGameStop) {
                let heroLeftVal = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
                let newLeftVal = (heroLeftVal + 20) + 'px';
                hero.style.left = newLeftVal;
        }
});

darkBtn.addEventListener('click', () => {
        if (isDarkAble) {
                // dark logics here 
                body.classList.add('bgDark');
                gameCont.classList.add('borderPink');
                HiScoreCont.classList.add('cPink', 'borderPink');
                scoreCont.classList.add('cPink', 'borderPink');
                gameName.classList.add('cPink');
                gameOverBox.classList.add('bgDark2', 'cPink');
                hero.classList.add('borderPink');
                villian.classList.add('borderPink');
                allBtnArr.forEach((elm) => {
                        elm.classList.add('borderPink', 'cPink');
                })
                startBtn.classList.add('bgDark2');
                reloadBtn.classList.add('bgDark2', 'cPink');
                darkBtn.classList.add('bgDark2', 'borderPink');

                darkBtn.innerHTML = '🤍';
                isDarkAble = false;
        } else if (!isDarkAble) {
                // light logics here
                body.classList.remove('bgDark');
                gameCont.classList.remove('borderPink');
                HiScoreCont.classList.remove('cPink', 'borderPink');
                scoreCont.classList.remove('cPink', 'borderPink');
                gameName.classList.remove('cPink');
                gameOverBox.classList.remove('bgDark2', 'cPink');
                hero.classList.remove('borderPink');
                villian.classList.remove('borderPink');
                allBtnArr.forEach((elm) => {
                        elm.classList.remove('borderPink', 'cPink');
                })
                startBtn.classList.remove('bgDark2');
                reloadBtn.classList.remove('bgDark2', 'cPink');
                darkBtn.classList.remove('bgDark2', 'borderPink');

                darkBtn.innerHTML = '🖤';
                isDarkAble = true;
        }

});