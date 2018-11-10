/** Direction player is facing*/
const DIRECTIONS = ["left", "right", "up", "down"];

/** @module Player
 * A class representing the player.
 */
export default class Player{

    /** @constructor
     * Constructs a new player instance
     * @param {float} x - the player's x position
     * @param {float} y - the player's y position
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.images = {};
        this.loadImages();

        this.state = "down";
        this.frame = 0;

        this.cycleCount = 0;
    }

    /** @method update
     * Updates the player
     * @param {double} deltaT - the elapsed time
     * @param {Input} input - the input object
     * @param {GameMap} map - the game map
     */
    update(deltaT, input, map) {
        var changed = false
        if(input.keyPressed("ArrowLeft") && map.canMove(this.x - 1, this.y, 20, 20) && (this.x > 16)){
            this.x--;
            this.state = "left";
            changed = true
        }
        if(input.keyPressed("ArrowRight") && map.canMove(this.x + 1, this.y, 20, 20) && (this.x < 2032)){
            this.x++;
            this.state = "right";
            changed = true
        }
        if(input.keyPressed("ArrowUp") && map.canMove(this.x, this.y - 1, 20, 20) && (this.y > 16)){
            this.y--;
            this.state = "up";
            changed = true;
        }
        if(input.keyPressed("ArrowDown") && map.canMove(this.x, this.y + 1, 20, 20) && (this.y < 752)){
            this.y++;
            this.state = "down";
            changed = true;
        }
        if( changed && this.cycleCount >= 12 && ( this.frame != 0 || this.frame != 2 ) ) {
            this.frame += 1;
            this.frame = this.frame % 4;
            this.cycleCount = 0;
        }
        this.cycleCount++
    }

    /** @method render
     * Renders the player
     * @param {double} deltaT - elapsed time
     * @param {Context2D} context - the rendering context
     */
    render(deltaT, context){
        var image = this.images[this.state][this.frame];
        context.drawImage(image, this.x - (32/2), this.y - (32/2));
    }

    /** @method loadImages
     * Loads animation images
     */
    loadImages(){
        DIRECTIONS.forEach( direction => {this.images[direction] = []});
        for( var i = 0; i < 4; i++ ) {
            DIRECTIONS.forEach( direction => {this.images[direction].push( this.getFrame( direction, i))});
        }
    }

    /** @method getFrame
     * Retrieves frame of for animation
     * @param {string} direction - direction of animation
     * @param {int} number - number of frame within the animation
     */
    getFrame(direction, number){
        var frame = new Image(32, 32);
        frame.src = "./cowboy/cowboy-" + direction + "-" + number +".png";
        return frame;
    }
}

