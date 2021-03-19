let cardsList = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
const secondsSpan = document.querySelector('#seconds')
const minutesSpan = document.querySelector('#minutes')
const minutesModal = document.querySelector('.modalminutes');
const secondsModal = document.querySelector('.modalseconds');
const deckElem = document.querySelector('.deck');
const movesDisplay = document.querySelector('.moves');
const modal = document.querySelector('.modal');
const finalStars = document.querySelector('.finalstars');
const resetButton = document.getElementsByClassName('fa-repeat');
let seconds = 0;
let minutes = 0;
resetButton[0].addEventListener('click', game);
resetButton[1].addEventListener('click', game);
myInterval = setInterval(function () {
    seconds++;
    secondsSpan.innerHTML = seconds;
    if (seconds === 60) {
        secondsSpan.innerHTML = '00';
        seconds = 0;
        minutes++;
        minutesSpan.innerHTML = minutes;
    }
}, 1000);
function game() {
    clearInterval(myInterval)
    let isFirstClick = true;
    modal.style.display = 'none';
    shuffle(cardsList);
    movesDisplay.innerHTML = 0;
    let openedCards = [];
    let movesCounter = 0;
    let numberofmatched = 0;
    const starsDisplay = document.querySelector('.stars');
    let starsContent = '';
    for (let i = 0; i < 5; i++) {
        starsContent += `
        <li><i class="fa fa-star"></i></li>`
    }
    starsDisplay.innerHTML = starsContent;
    let deckContent = '';
    for (let i = 0; i < cardsList.length; i++) {
        deckContent += `
        <li class="card">
            <img src="./img/${cardsList[i]}.png">
        </li>`
    }
    deckElem.innerHTML = deckContent;
    seconds = 0;
    minutes = 0;
    secondsSpan.innerHTML = 0;
    minutesSpan.innerHTML = 0;
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function handleClick() {
            if (isFirstClick) {
                myInterval = setInterval(function () {
                    seconds++;
                    secondsSpan.innerHTML = seconds;
                    if (seconds === 60) {
                        secondsSpan.innerHTML = '00';
                        seconds = 0;
                        minutes++;
                        minutesSpan.innerHTML = minutes;
                    }
                }, 1000);
                isFirstClick = false;
            }
            cards[i].classList.add('open');
            openedCards.push(cards[i]);
            cards[i].style.pointerEvents = 'none';
            if (openedCards.length === 2) {
                if (openedCards[0].firstElementChild.src === openedCards[1].firstElementChild.src) {
                    console.log('its a match')
                    deckElem.style.pointerEvents = 'none';
                    openedCards[0].style["-webkit-box-shadow"] = "0px 0px 13px 9px green";
                    openedCards[1].style["-webkit-box-shadow"] = "0px 0px 13px 9px green";
                    setTimeout(function () {
                        openedCards[0].style.boxShadow = '';
                        openedCards[1].style.boxShadow = '';
                        openedCards = []
                        deckElem.style.pointerEvents = '';
                        movesCounter++;
                        movesDisplay.innerHTML = movesCounter;
                        if (movesCounter === 12 || movesCounter === 18 || movesCounter === 24 || movesCounter === 30) {
                            starsDisplay.lastElementChild.remove();
                        }
                    }, 600)
                    numberofmatched++;
                    if (numberofmatched === 8) {
                        console.log('You won!')
                        setTimeout(function () {
                            finalStars.innerHTML = starsDisplay.innerHTML;
                            secondsModal.innerHTML = seconds;
                            minutesModal.innerHTML = minutes;
                            modal.style.display = 'flex';
                        }, 500)
                    }
                } else if (openedCards[0].firstElementChild.src !== openedCards[1].firstElementChild.src) {
                    console.log('Its not a match')
                    deckElem.style.pointerEvents = 'none';
                    openedCards[0].style["-webkit-box-shadow"] = "0px 0px 13px 9px red";
                    openedCards[1].style["-webkit-box-shadow"] = "0px 0px 13px 9px red";
                    setTimeout(function () {
                        openedCards[0].removeAttribute("style");
                        openedCards[1].removeAttribute("style");
                        openedCards[0].classList.remove('open');
                        openedCards[1].classList.remove('open');
                        openedCards = []
                        deckElem.style.pointerEvents = '';
                        movesCounter++;
                        movesDisplay.innerHTML = movesCounter;
                        if (movesCounter === 12 || movesCounter === 18 || movesCounter === 24 || movesCounter === 30) {
                            starsDisplay.lastElementChild.remove()
                        }
                    }, 600)
                }
            }
        })
    }
}
game();