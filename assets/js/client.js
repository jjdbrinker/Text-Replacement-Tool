$(document).ready(function () {
    try {
        const content = $("#sourceSnippet").html();
        const contentParsed = content.split(",");
        if (contentParsed.length > 1) {
            for (let i = 0; i < contentParsed.length; i++) {
                const element = contentParsed[i].trim();
                $("#checkboxes").append(`<input type="checkbox" name="replacement" class="replaceChoice" value="${element}">${element}<br/>`);
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
        destination.html("");

        for (let i = 0; i < selectedReplacements.length; i++) {
            var findRegex = new RegExp(find,"g");
            const replacedString = source.replace(findRegex, selectedReplacements[i]);
            if(i != selectedReplacements.length) {
                destination.append(replacedString + "<br/>");
            } else {
                destination.append(replacedString);
            }
        }
        return false;    
    });
    $("#toggleAll").click(function(event) {
        event.preventDefault(); 
        if($("#toggleAll").hasClass("allSelected")) {
            $(".replaceChoice").prop("checked", false);
            $("#toggleAll").removeClass("allSelected");
            $("#toggleAll").text("Select All"); 
        } else {
            $("#toggleAll").addClass("allSelected");
            $("#toggleAll").text("Unselect All");
            $(".replaceChoice").prop("checked", true);
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
    function getSelectedReplacements() {
        let selectedReplacements = [];
        $('input[name="replacement"]:checked').each(function () {
            selectedReplacements.push(this.value);
        });
        return selectedReplacements;
    }
});
