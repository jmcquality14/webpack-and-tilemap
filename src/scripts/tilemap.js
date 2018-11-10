import Tile from "./tile"
/** @module TileMap
 * Class representing a Tile map for a game
 */
export default class TileMap {
    /** @static @method parseMap
     * Parses a map from a given JSON object
     * @param {JSON} map - JSON object to be parsed
     */
    static parseMap(map) {
        var tileTemplates = {};
		var tiles = Int8Array.from( map.layers[0].data );
        map.tilesets[0].tiles.forEach( tileJSON => {var tile = Tile.parseTile(tileJSON);tileTemplates[tile.id] = tile;});		
        return new TileMap( map.width, map.height, map.tilewidth, map.tileheight, tiles, tileTemplates )
    }

    /** @constructor
     * Constructs new instance of game map
     * @param {int} width - width of game map in tiles
     * @param {int} height - height of game map in tiles
     * @param {int} tileWidth - width of tiles
     * @param {int} tileHeight - height of tiles
     * @param {Int8Array} tiles - array of tile IDs
     * @param {Array} templates - array of reference tiles
     */
    constructor(width, height, tileWidth, tileHeight, tiles, templates) {
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tiles = tiles;
        this.templates = templates;
    }

    /** @method render
     * Renders game map on given coordinates
     * @param {2DContext} context - context to be render
     * @param {int} displacementX - number of pixels to displace map from horizontal axis
     * @param {int} displacementY - number of pixels to displace map from vertical axis
     */
    render(context, displacementX, displacementY) {
        for( var j = 0; j < this.height; j++ ) {
            for( var i = 0; i < this.width; i++ ) {
                var x = i * this.tileWidth + displacementX;
                var y = j * this.tileHeight + displacementY;
                var templateID = this.tiles[this.getTileIndex(i, j)];
                this.templates[templateID].render(context, x, y);
            }
        }
    }

    /** @method canMove
     * Checks whether a object on coordinates X and Y with width and height can be moved there
     * @param {int} x - X position of object 
     * @param {int} y - Y position of object 
     * @param {int} width - width of object
     * @param {int} height - height of object
     */
    canMove(x, y, width, height) {
        var minI = Math.floor((x - width/2) / this.tileWidth);
        var maxI = Math.floor((x + width/2) / this.tileWidth);
        var minJ = Math.floor((y - height/2) / this.tileHeight);
        var maxJ = Math.floor((y + height/2) / this.tileHeight);
        for( var j = minJ; j <= maxJ; j++){
            for( var i = minI; i <= maxI; i++){
                var templateID = this.tiles[this.getTileIndex(i, j)];
                if( this.templates[templateID].solid){
                    return false;
                }
            }
        }
        return true;
    }

    /** @method getTileIndex
     * Computes index of tile on coordinated [i, j]
     * @param {int} i - horizontal index
     * @param {int} j - vertical index
     */
    getTileIndex(i, j) {
        return j * this.width + i
    }
}