
//Cajas de texto sacadas de https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-1/
export class DialogBox {
    constructor(scene) {
        this.scene = scene;
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
    }

    toggleWindow() {
        this.visible = !this.visible;
        if (this.text) this.text.visible = this.visible;
        if (this.graphics) this.graphics.visible = this.visible;
        if (this.closeBtn) this.closeBtn.visible = this.visible;
        if (this.timedEvent) this.timedEvent.remove();
        if (this.text) this.text.destroy();
    }

    setText(text, animate) {
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove();

        var tempText = animate ? '' : text;

        this.textPosition(tempText);
        if (animate) {
            this.timedEvent = this.scene.time.addEvent({
            delay: 150 - (this.dialogSpeed * 30),
            callback: this.animateText,
            callbackScope: this,
            loop: true
            });
        }
    }

    animateText() {
        this.eventCounter++;
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
          this.timedEvent.remove();
        }
    }

    textPosition(text) {
        if (this.text) this.text.destroy();
        var x = this.padding + 10;
        var y = this.getGameHeight() - this.windowHeight - this.padding + 10;
        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
              wordWrap: { width: this.getGameWidth() - (this.padding * 2) - 25 }
            }
        });
    }
}

export default class DialogScene extends Phaser.Scene {
    constructor() {
        super({key: 'dialog', active: true, visible: true});
        this.dialogBox = new DialogBox(this);
        this.hasCreatedWindow = false;
        this.isToggled = true;
    }

    preload() {
    }

    create() {
    }

    createWindow() {
        this.dialogBox.init();
        this.hasCreatedWindow = true;
    }

    setText(text) {
        this.dialogBox.setText(text, true);
    }

    toggleWindow() {
        this.dialogBox.toggleWindow();
        this.isToggled = !this.isToggled;
    }
}