
//Cajas de texto sacadas de https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-1/
export default class DialogBox {
    constructor(scene) {
        this.scene = scene;
        this.scene.add.existing(this);
    }

    init(opts) {
        if (!opts) opts = {};
        this.borderThickness = opts.borderThickness || 3;
        this.borderColor = opts.borderColor || 0x907748;
        this.borderAlpha = opts.borderAlpha || 1;
        this.windowAlpha = opts.windowAlpha || 0.8;
        this.windowColor = opts.windowColor || 0x303030;
        this.windowHeight = opts.windowHeight || 150;
        this.padding = opts.padding || 32;
        this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
        this.dialogSpeed = opts.dialogSpeed || 3;
        this.eventCounter = 0;
        this.visible = true;
        this.text;
        this.dialog;
        this.graphics;
        this.closeBtn;
        this.createWindow();
    }

    getGameWidth() {
        return this.scene.sys.game.config.width;
    }

    getGameHeight() {
        return this.scene.sys.game.config.height;
    }

    calculateWindowDimensions(width, height) {
        var x = this.padding;
        var y = height - this.windowHeight - this.padding;
        var rectWidth = width - (this.padding * 2);
        var rectHeight = this.windowHeight;
        return {
            x,
            y,
            rectWidth,
            rectHeight
        };
    }

    createInnerWindow(x, y, rectWidth, rectHeight) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }

    createOuterWindow(x, y, rectWidth, rectHeight) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }

    createWindow() {
        var gameHeight = this.getGameHeight();
        var gameWidth = this.getGameWidth();
        var dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics();
        this.createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this.createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this.equisVentana();
    }

    equisVentana() {
        var self = this;
        this.closeBtn = this.scene.make.text({
            x: this.getGameWidth() - this.padding - 14,
            y: this.getGameHeight() - this.windowHeight - this.padding + 3,
            text: 'X',
            style: {
            font: 'bold 12px Arial',
            fill: this.closeBtnColor
            }
        });
        this.closeBtn.setInteractive();
        this.closeBtn.on('pointerover', function () {
            this.setTint(0xff0000);
        });
        this.closeBtn.on('pointerout', function () {
            this.clearTint();
        });
        this.closeBtn.on('pointerdown', function () {
            self.toggleWindow();
        });
    }
}