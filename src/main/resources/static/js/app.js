//var apimodule = apimock;
var apimodule = apiclient;

var app = (function () {
    var authorName = "";
    var canvas, ctx;
    var currentBlueprint = null;
    var creatingNew = false;

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
            currentBlueprint = bp;
            drawBlueprint(currentBlueprint);
        });
    };

    var handlePointerEvent = function (event) {
        if (!currentBlueprint) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        currentBlueprint.points.push({ x: x, y: y });

        drawBlueprint(currentBlueprint);
    };

    var initCanvas = function () {
        canvas = document.getElementById("blueprintCanvas");
        ctx = canvas.getContext("2d");

        if (window.PointerEvent) {
            canvas.addEventListener("pointerdown", handlePointerEvent);
        } else {
            canvas.addEventListener("mousedown", handlePointerEvent);
            canvas.addEventListener("touchstart", function (e) {
                handlePointerEvent(e.touches[0]);
            });
        }
    };

    var createNewBlueprint = function () {
        const newName = prompt("Ingrese el nombre del nuevo blueprint:");
        if (!newName) return;

        creatingNew = true;
        currentBlueprint = { author: authorName, name: newName, points: [] };
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        $("#currentBlueprint").text("Current blueprint: " + newName);
    };

    var saveOrUpdateBlueprint = function () {
        if (!currentBlueprint) {
            alert("There is no blueprint currently open.");
            return;
        }

        if (creatingNew) {
            apimodule.createBlueprint(currentBlueprint, function () {
                alert("Blueprint created.");
                creatingNew = false;
                updateBlueprints(authorName);
            });
        } else {
            apimodule.updateBlueprint(authorName, currentBlueprint.name, currentBlueprint, function () {
                alert("Blueprint updated.");
                updateBlueprints(authorName);
            });
        }
    };

    var deleteBlueprint = function () {
        if (!currentBlueprint) {
            alert("Currently, there is no blueprint to delete.");
            return;
        }

        if (confirm("¿Está seguro de eliminar el blueprint '" + currentBlueprint.name + "'?")) {
            apimodule.deleteBlueprint(authorName, currentBlueprint.name, function () {
                alert("Blueprint deleted.");

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                currentBlueprint = null;
                $("#currentBlueprint").text("Current blueprint:");
                updateBlueprints(authorName);
            });
        }
    };

    return {
        setAuthorName: setAuthorName,
        updateBlueprints: updateBlueprints,
        openBlueprint: openBlueprint,
        initCanvas: initCanvas,
        saveOrUpdateBlueprint: saveOrUpdateBlueprint,
        createNewBlueprint: createNewBlueprint,
        deleteBlueprint: deleteBlueprint
    };
})();