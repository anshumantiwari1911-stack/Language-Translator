async function translateText() {
    let text = document.getElementById("inputText").value;
    let source = document.getElementById("sourceLang").value;
    let target = document.getElementById("targetLang").value;

    if (text.trim() === "") {
        alert("Please enter text");
        return;
    }

    try {
        let response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
        );

        let data = await response.json();

        document.getElementById("output").innerHTML =
            data.responseData.translatedText;

    } catch (error) {
        document.getElementById("output").innerHTML =
            "Translation failed!";
    }
}

function copyText() {
    let text = document.getElementById("output").innerText;

    navigator.clipboard.writeText(text);

    alert("Copied Successfully!");
}

function swapLanguages() {
    let source = document.getElementById("sourceLang");
    let target = document.getElementById("targetLang");

    let temp = source.value;
    source.value = target.value;
    target.value = temp;
}
function clearText() {
    document.getElementById("inputText").value = "";
    document.getElementById("output").innerHTML = "";
}