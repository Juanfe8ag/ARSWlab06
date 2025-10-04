var apimock = (function () {

    var mockdata = [];

    mockdata["juan"] = [
        {
            author: "juan",
            name: "test",
            points: [
                {x: 0, y: 0},
                {x: 5, y: 0},
                {x: 10, y: 10},
                {x: 20, y: 20}
            ]
        },
        {
            author: "juan",
            name: "casa",
            points: [
                {x:10,y:10},
                {x:50,y:10},
                {x:50,y:50},
                {x:10,y:50}
            ]
        },
        {
            author: "juan",
            name: "estrella",
            points: [
                {x:100,y:100},
                {x:120,y:150},
                {x:80,y:150},
                {x:140,y:120},
                {x:60,y:120}
            ]
        }
    ];

    mockdata["maria"] = [
        {
            author: "maria",
            name: "parque",
            points: [
                {x: 10, y: 10},
                {x: 20, y: 10},
                {x: 20, y: 20},
                {x: 10, y: 20}
            ]
        },
        {
            author: "maria",
            name: "rio",
            points: [
                {x: 0, y: 0},
                {x: 5, y: 15},
                {x: 10, y: 25},
                {x: 15, y: 35},
                {x: 25, y: 50}
            ]
        }
    ];

    var selectedAuthor = null;
    var blueprintsSummary = [];

    return {

        selectAuthor: function (author) {
            if (mockdata[author]) {
                selectedAuthor = author;
                updateBlueprintsSummary(author);
            } else {
                selectedAuthor = null;
                blueprintsSummary = [];
            }
        },

        getSelectedAuthor: function () {
            return selectedAuthor;
        },

        getBlueprintsSummary: function () {
            return blueprintsSummary;
        },

        changeSelectedAuthorName: function (newName) {
            if (selectedAuthor && mockdata[selectedAuthor]) {
                mockdata[newName] = mockdata[selectedAuthor].map(function (bp) {
                    bp.author = newName;
                    return bp;
                });

                delete mockdata[selectedAuthor];
                selectedAuthor = newName;
                updateBlueprintsSummary(newName);
            }
        },

        getBlueprintsByAuthor: function(author, callback) {
            callback(mockdata[author]);
        },

        getBlueprintsByNameAndAuthor: function(author, name, callback) {
            var bps = mockdata[author].filter(function(bp) { return bp.name === name })[0];
            callback(bps);
        }
    };
})();
