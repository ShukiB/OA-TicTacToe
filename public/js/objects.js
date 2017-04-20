function Game() {
    return {
        board: new Board(),
        players: [],
        moves: new Queue(),
        winner: 0,
        end: false
    }
}

function Board() {
    return [
        [ { value: null, location:[0,0] }, { value: null, location:[0,1] }, { value: null, location:[0,2] } ],
        [ { value: null, location:[1,0] }, { value: null, location:[1,1] }, { value: null, location:[1,2] } ],
        [ { value: null, location:[2,0] }, { value: null, location:[2,1] }, { value: null, location:[2,2] } ]
    ];
}

function Player(name, marker){
    return {
        name: name,
        marker: marker
    }
}

function BoardCell (mark, location) {
    return {
        mark: mark,
        location: location
    }
}

function Queue() {
    var elements = [];

    this.getSize = function() {
        return elements.length;
    };

    this.enqueue = function(data) {
        return elements.push(data);
    };

    this.dequeue = function() {
        return elements.shift();
    };
}

// pollyfill for some browsers
;(function(){
    if (!window.location.origin) {
        window.location.origin = window.location.protocol +
                                 "//" +
                                 window.location.hostname +
                                 (window.location.port ? ":" + window.location.port : '');
    }
})();
