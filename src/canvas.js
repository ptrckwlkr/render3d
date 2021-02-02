export default class Canvas {
    constructor(id) {
        this.width = parseInt(process.env.VIEWPORT_WIDTH)
        this.height = parseInt(process.env.VIEWPORT_HEIGHT)

        // The DOM canvas element
        this._canvas = document.getElementById(id)
        this._canvas.width = this.width
        this._canvas.height = this.height
        this._canvas.context = this._canvas.getContext('2d', {alpha: false})
        this._canvas.context.imageSmoothingEnabled = false;

        // The canvas buffer
        this._buffer = document.createElement('canvas')
        this._buffer.width = this.width
        this._buffer.height = this.height
        this._buffer.context = this._buffer.getContext('2d', {alpha: false})
        this._buffer.imageData = this._buffer.context.createImageData(this.width, this.height)

        this._pixels = Array(this.width * this.height)
        for (let i = 0; i < this.width; i++) {
            this[i] = {}
            for (let j = 0; j < this.height; j++) {
                let pixel = {
                    R: 0,
                    G: 0,
                    B: 0
                }
                this._pixels[j * this.width + i] = pixel
                this[i][j] = pixel
            }
        }
    }

    repaint() {
        // Write the RGB data to the ImageData of the buffering canvas
        for (let i = 0, j = 0; i < this._buffer.imageData.data.length; i += 4, j++) {
            this._buffer.imageData.data[i] = this._pixels[j].R
            this._buffer.imageData.data[i + 1] = this._pixels[j].G
            this._buffer.imageData.data[i + 2] = this._pixels[j].B
            this._buffer.imageData.data[i + 3] = 255
        }

        // Write the buffer to the main canvas
        this._buffer.context.putImageData(this._buffer.imageData, 0, 0);
        this._canvas.context.drawImage(this._buffer, 0, 0, this._canvas.width, this._canvas.height)
    }
}
