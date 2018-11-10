/** @module Window
 * A class representing the game's screen window
 */
export default class Window {
    constructor(width, height, displacement) {
        this.width = width;
        this.height = height;
        this.offset = displacement;
        this.target = null;
        this.layers = [];
    }

    /** @method bindTo
     * Binds camera to follow a specific object
     * @param {Object} target - object to follow
     */
    bindTo(target) {
        this.target = target
    }

    /** @method addLayer
     * Adds next layer to be rendered on top of all the others
     * @param {Canvas} canvas - reference to canvas which content will get rendered
     * @param {float} speed - speed at which a layer will move (1 equals to speed of tracked object)
     * @param {int} offset - basic offset of displayed layer
     */
    addLayer(canvas, speed, offset) {
        this.layers.push( { canvas: canvas, speed: speed, offset: offset } )
    }

    /** @method render
     * Renders all layers from given context
     * @param {2DContext} context - context being rendered to
     */
    render(context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, this.width, this.height);
        this.layers.forEach( layer => {context.drawImage(layer.canvas, layer.offset, 0)});
    }

    /** @method update
     * Updates camera's location 
     * @param {float} deltaT - change in time between frames
     */
    update(deltaT) {
        var deltaX = this.computeDeltaX(deltaT);
        this.offset += deltaX;
        this.layers.forEach( layer => {layer.offset -= layer.speed * deltaX})
    }

    /** @method computeDeltaX
     * Computes number of pixels the main camera should move
     * @param {float} deltaT - change in time between frames
     */
    computeDeltaX(deltaT) {
        if( !this.target ) {return 0.0;}
        var cameraX = this.target.x - this.offset;
        var leftBoundary = this.width * 0.2;
        var rightBoundary = this.width * (1 - 0.2);
		if( cameraX < leftBoundary ){return cameraX - leftBoundary;}
        if( cameraX > rightBoundary ){return cameraX - rightBoundary;}
        return 0.0
    }
}