 function Row(rowString) {
        if (rowString.indexOf("[") == -1) {
            this.type = "Unknown";
            return;
        };
        //splits '[a]b' to ['a','b']
        var rowParts = rowString.split(/[\[+\]]/).filter(s => s.length > 1);
        this.type = rowParts[0].trim();
        this.value = rowParts[1].trim();
    }

    function splitLogToRows(chunk) {
        console.log(chunk);
        splittedChunk = chunkString.split("\n");
        var rowArray = [];
        splittedChunk.forEach(function(rowStr) {
            if (rowStr.indexOf("Deleting") == 0) {
                rowStr = "[ffmpeg]" + rowStr;
            }
            var splittedRow = rowStr.split("[").filter(s => s.length > 1);
            if (splittedRow.length == 1) {
                rowArray.push(new Row(rowStr));
            } else {
                splittedRow.forEach(r => rowArray.push(new Row("[" + r)));
            }
        });
        console.log(rowArray);
        return rowArray;
    }