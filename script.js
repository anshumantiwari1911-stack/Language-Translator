async function translateText() {
    let text = document.getElementById("inputText").value.trim();
    let source = document.getElementById("sourceLang").value;
    let target = document.getElementById("targetLang").value;

    if (text === "") {
        alert("Please enter text");
        return;
    }

    if (source === target) {
        document.getElementById("output").innerText = text;
        return;
    }

    try {
        let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

        let response = await fetch(url);
        let data = await response.json();

        if (data.responseData && data.responseData.translatedText) {
            document.getElementById("output").innerText =
                data.responseData.translatedText;
        } else {
            document.getElementById("output").innerText =
                "Translation not available";
        }

    } catch (error) {
        document.getElementById("output").innerText =
            "Translation failed";
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
    document.getElementById("output").innerText = "";
}