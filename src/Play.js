class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image("ball", "ball.png")
        this.load.image("wall", "wall.png")
        this.load.image("oneway", "one_way_wall.png")
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, "cup"); //Adding "physics" to cup because it needs to collide with the ball
        this.cup.body.setCircle(this.cup.width / 4); //Setting a circular body
        this.cup.body.setOffset(this.cup.width / 4); //Offsetting the circular body by this.cup.width/4 for both x and y
        this.cup.body.setImmovable(true); //Making physics body immovable

        //adding ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, "ball"); //Recall y value is from top to bottom (0 at top, height value at bottom)
        this.ball.body.setCircle(this.ball.width / 2); //SetCircle asks for a radius therefore / 2
        this.ball.body.setCollideWorldBounds(true); //Prevents exiting the canvas
        this.ball.body.setBounce(0.5); //Adding medium bouncing
        this.ball.body.setDamping(true).setDrag(0.5); //Allows dragging

        //adding walls
        let wallA = this.physics.add.sprite(0, height / 4, "wall");
        wallA.setX(Phaser.Math.Between(0 + wallA.width / 2, width - wallA.width / 2)) //randomizing X position and making sure it is within bounds
        wallA.body.setImmovable(true);

        let wallB = this.physics.add.sprite(0, height / 2, "wall");
        wallB.setX(Phaser.Math.Between(0 + wallB.width / 2, width - wallB.width / 2))
        wallB.body.setImmovable(true);

        this.walls = this.add.group([wallA, wallB]) //Adding Phaser group to scene

        //adding one way wall
        this.oneWay = this.physics.add.sprite(0, height / 4 * 3, "oneway");
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width / 2, width - this.oneWay.width / 2));
        this.oneWay.body.setImmovable(true);
        this.oneWay.body.checkCollision.down = false; //Setting down collision box to false to allow things to pass through the bottom

        //Variables to control velocity
        this.SHOT_VELOCITY_X = 200;
        this.SHOT_VELOCITY_Y_MIN = 700;
        this.SHOT_VELOCITY_Y_MAX = 1100;

        //Allowing user input
        this.input.on("pointerdown", (pointer) => { //On pointer down...
            let shotDirection;
            pointer.y <= this.ball.y ? shotDirection = 1 : shotDirection = -1;
            this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X)); //Phaser.Math.Between returns a random value between two values
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection);
        });

        //Setting collisions
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => { //the (ball, cup) are new parameters
            ball.destroy();
        });
        this.physics.add.collider(this.ball, this.walls);
        this.physics.add.collider(this.ball, this.oneWay);
    }

    update() {

    }
}