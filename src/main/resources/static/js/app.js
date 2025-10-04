var apimodule = apimock;
//var apimodule = apiclient;

var app = (function () {
    var authorName = "";

    var setAuthorName = function (name) {
        authorName = name;
        $("#authorName").text("Autor: " + authorName);
    };

    var updateBlueprints = function (author) {
        apimodule.getBlueprintsByAuthor(author, function (bps) {
            $("#table-body").empty();

            var transformed = bps.map(function (bp) {
                return { name: bp.name, points: bp.points.length };
            });

            transformed.map(function (bp) {
                $("#table-body").append(
                    "<tr>" +
                    "<td>" + bp.name + "</td>" +
                    "<td>" + bp.points + "</td>" +
                    "<td><button class='btn btn-info' onclick='app.openBlueprint(\"" + bp.name + "\")'>Open</button></td>" +
                    "</tr>"
                );
            });

            var totalPoints = transformed.reduce((acc, bp) => acc + bp.points, 0);
            $("#totalPoints").text("Total user points: " + totalPoints);
        });
    };

    var drawBlueprint = function (blueprint) {
        $("#currentBlueprint").text("Current blueprint: " + blueprint.name);

        var canvas = document.getElementById("blueprintCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (blueprint.points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);
            for (var i = 1; i < blueprint.points.length; i++) {
                ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y);
            }
            ctx.stroke();
        }
    };

    var openBlueprint = function (bpname) {
        apimodule.getBlueprintsByNameAndAuthor(authorName, bpname, function (bp) {
            drawBlueprint(bp);
        });
    };

    return {
        setAuthorName: setAuthorName,
        updateBlueprints: updateBlueprints,
        openBlueprint: openBlueprint
    };
})();