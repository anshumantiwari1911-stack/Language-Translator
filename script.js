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
        let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;

        let response = await fetch(url);
        let data = await response.json();

        let translatedText = "";

        if (data && data[0]) {
            data[0].forEach(item => {
                if (item[0]) {
                    translatedText += item[0];
                }
            });
        }

        document.getElementById("output").innerText =
            translatedText || "Translation not available";

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
