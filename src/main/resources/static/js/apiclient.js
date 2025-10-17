var apiclient = (function () {

    var apiUrl = "http://localhost:8080/blueprints";

    return {

        getBlueprintsByAuthor: function(author, callback) {
            $.get(apiUrl + "/" + author, function(data) {
                callback(data);
            }).fail(function() {
                alert("Error obteniendo planos del autor: " + author);
            });
        },

        getBlueprintsByNameAndAuthor: function(author, name, callback) {
            $.get(apiUrl + "/" + author + "/" + name, function(data) {
                callback(data);
            }).fail(function() {
                alert("Error obteniendo plano " + name + " de " + author);
            });
        },

        updateBlueprint: function (author, name, blueprint, callback) {
            return $.ajax({
                url: apiUrl + "/" + author + "/" + name,
                type: "PUT",
                data: JSON.stringify(blueprint),
                contentType: "application/json"
            }).then(callback);
        },

        createBlueprint: function (blueprint, callback) {
            return $.ajax({
                url: apiUrl,
                type: "POST",
                data: JSON.stringify(blueprint),
                contentType: "application/json"
            }).then(callback);
        },

        deleteBlueprint: function (author, name, callback) {
            return $.ajax({
                url: apiUrl + "/" + author + "/" + name,
                type: "DELETE"
            }).then(callback);
        }
    };

})();