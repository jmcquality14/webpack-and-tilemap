import Input from './input'
import TileMap from './tilemap'
import Window from './window'

/** @class Game
  * A class representing the high-level functionality
  * of a game - the game loop, buffer swapping, etc.
  */
export default class Game {

    /** @constructor
     * Creates the game instance
     * @param {integer} width - the width of the game screen in pixels
     * @param {integer} heght - the height of the game screen in pixels
     */
    constructor(width, height) {
		this.frameStart = null;
        this.width = width;
        this.height = height;
        this.input = new Input();
        this.entities = [];
        this._window = new Window(width, height, 0);
		// Gets tilemap file
		var File = require('../Map.json');
        this.map = TileMap.parseMap(File);
		//Sets up backbuffer
        this.backBuffer = document.createElement('canvas');
        this.backBuffer.width = this.map.width * this.map.tileWidth;
        this.backBuffer.height = this.map.height * this.map.tileHeight;
        this.backBufferCtx = this.backBuffer.getContext('2d');
        this._window.addLayer( this.backBuffer, 1, 0 )
		//Sets up screenBuffer        
		this.screenBuffer = document.createElement('canvas');
        this.screenBuffer.width = this.width;
        this.screenBuffer.height = this.height;
        this.screenBufferCtx = this.screenBuffer.getContext('2d');
        document.body.append(this.screenBuffer);
    }

    /** @method setWindow
     * Sets window to follow a given object
     * @param {Object} target - oject for window to follow
     */
    setWindow(target){
        this._window.bindTo(target);
    }

    /** @method addEntity
     * Adds an entity to the game world. Entities should have an update() and render() method
     * @param {Object} entity - the entity to be added
     */
    addEntity(entity){
        this.entities.push(entity);
    }

    /** @method update
     * Updates the game state
     * @param {integer} elapsedTime - the number of milliseconds per frame
     */
    update(elapsedTime) {
        this.entities.forEach(entity => entity.update( elapsedTime, this.input, this.map));
        this.input.update();
        this._window.update();
    }

    /** @method render
     * Renders the game state
     * @param {integer} elapsedTime - the number of milliseconds per frame
     */
    render(elapsedTime) {
        this.backBufferCtx.clearRect(0, 0, this.map.width*this.map.tileWidth, this.map.height*this.map.tileHeight);
        this.map.render(this.backBufferCtx, 0, 0);
        this.entities.forEach(entity => entity.render( elapsedTime, this.backBufferCtx ) );
        this._window.render(this.screenBufferCtx);
    }

    /** @method loop
     * Updates and renders the game and calls itself on the next draw cycle.
     * @param {DOMHighResTimestamp} timestamp - the current system time
     */
    loop(timestamp) {
        var elapsedTime = this.frameStart ? timestamp - this.frameStart : 0
        this.update(elapsedTime);
        this.render(elapsedTime);
        this.frameStart = timestamp
        window.requestAnimationFrame( timestamp => {this.loop(timestamp);});
    }
}