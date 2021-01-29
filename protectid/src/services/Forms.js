export default {
    getValues (selector) {
        let inputs = document.querySelectorAll(selector);
        let values = {};
        inputs.forEach(input => {
            values[input.id] = input.value;
        });
        return values;
    },
    setLines(doc, text, line) {
        const start = 0;
        // Nombre de caractères par lignes
        const delimiter = 90;
        // Calcul le nombre  de lignes
        const loops = Math.ceil( parseInt(text.length) / delimiter );

        for (let i = 0; i < loops; i++) {
            let textLine = text.substr(start, delimiter);
            doc.text(`${textLine}\n`, 10, line);
            text = text.replace(textLine, '');
            line = line + 5;
        }
    },
};