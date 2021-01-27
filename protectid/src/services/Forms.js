export default {
    getValues (selector) {
        let inputs = document.querySelectorAll(selector);
        let values = {};
        inputs.forEach(input => {
            values[input.id] = input.value;
        });
        return values;
    },
    viewPdf (doc) {
        let dataSrc = doc.output("datauristring");
        let win = window.open("", "myWindow");
        win.document.write("<html><head><title>jsPDF</title></head><body><embed src=" + dataSrc + " style=\"height: 100vh; width: 100%;\"></embed></body></html>");
    },
};