$(document).ready(function () {
    try {
        const content = $("#sourceSnippet").html();
        const contentParsed = content.split(",");
        if (contentParsed.length > 1) {
            for (let i = 0; i < contentParsed.length; i++) {
                const element = contentParsed[i].trim();
                $("#checkboxes").append(`<input type="checkbox" checked name="replacement" value="${element}">${element}<br/>`);
            }
        } else {
            displayNotice("Source content was empty or invalid. Please edit index.html and add data to the #sourceSnippet element.<br/><br/>The data has to comma separated (e.g. value1, value2)"); 
        }
    } catch (error) {
        console.error(error);
    }
    $("form").submit(function (event) {
        hideNotice();
        event.preventDefault();
        const selectedReplacements = getSelectedReplacements();
        const find = $("#find").val();
        const source = $("#source").val(); 
        const destination = $("#destination");
        if (selectedReplacements.length < 1) {
            displayNotice("Please select at least one item to replace the input with.");
            return false;
        }

        /* empty destination box */
        destination.val("");

        for (let i = 0; i < selectedReplacements.length; i++) {
            const replacedString = source.replace(find, selectedReplacements[i]);
            if(i != selectedReplacements.length) {
                destination.val(destination.val() + replacedString + "\n");
            } else {
                destination.val(destination.val() + replacedString);
            }
        }
        return false;    
    });

    function hideNotice() {
        $("#notice").fadeOut();
    }
    function displayNotice(msg) {
        $("#notice").html(msg);
        $("#notice").fadeIn();
        return false;  
    }
    function replaceString(sourceString, find, replace) {
        return 
    }
    function getSelectedReplacements() {
        let selectedReplacements = [];
        $('input[name="replacement"]:checked').each(function () {
            selectedReplacements.push(this.value);
        });
        return selectedReplacements;
    }
});