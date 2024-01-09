const carouselText = [
    {color: "#ea4436", fontFamily: "Fruktur"},
    {color: "#347d39", fontFamily: "Inconsolata"},
    {color: "#2869e9", fontFamily: "Irish Grover"},
    {color: "#ec775c", fontFamily: "Bebas Neue"},
  ]

$(document).ready(async function () {
    carousel(carouselText, "#typing-effect")
});

async function carousel(carouselList, eleRef) {
    var i = 0;
    while (true) {
        updateFont(eleRef, carouselList[i].fontFamily)
        updateColor(eleRef, carouselList[i].color)
        //await typeSentence(carouselList[i].text, eleRef);
        await waitForMs(800);
        //await deleteSentence(eleRef);
        //await waitForMs(500);
        i++
        if (i >= carouselList.length) {
            i = 0;
        }
    }
}

async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
        await waitForMs(delay);
        $(eleRef).append(letters[i]);
        i++
    }
    return;
}

async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
        await waitForMs(100);
        letters.pop();
        $(eleRef).html(letters.join(""));
    }
}

function updateFont(eleRef, fontFamily) {
    $(eleRef).css('font-family', fontFamily);
}

function updateColor(eleRef, color) {
    $(eleRef).css('color', color);
}

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}