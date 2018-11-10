/** @module Tile
 * A class representing a tile object in a tilemap
 */
export default class Tile {

    /** @static @method parseTile
     * Parses tile from a given JSON object
     * @param {JSON} tile - JSON object containing tile info
     */
    static parseTile(tile) {
        var id = tile.id;
        var solid = false;
        if( tile.properties ) solid = tile.properties[0].value;
        var src = tile.image;
        var width = tile.imagewidth;
        var height = tile.imageheight;
        return new Tile(id, width, height, src, solid);
    }

    /** @constructor
     * Constructs a new instance of reference tile
     * @param {int} id - tile's id
     * @param {int} width - width of tile
     * @param {int} height - height of tile
     * @param {string} src - path to tile's png image
     * @param {boolean} solid - property of tile that states if the tile is passable through or not
     */
    constructor(id, width, height, src, solid) {
        this.id = id;
        this.solid = solid;
        this.width = width;
        this.height = height;
        this.image = new Image(width, height);
        this.image.src = "./dist/" + src;
    }

    /** @method render
    * Renders this tile on given coordinates
    * @param {Context2D} context - the rendering context
    * @param {int} x - X coordinate to render tile to
    * @param {int} y - Y coordinate to render tile to
    */
    render(context, x, y) {
        context.drawImage( this.image, x, y )
    }
}