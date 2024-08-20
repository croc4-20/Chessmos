export class SeededRNG {
    constructor(seed) {
        this.modulus = 4294967296;
        this.multiplier = 1664525;
        this.increment = 1013904223;
        this.seed = parseInt(seed.slice(0, 10), 16);
    }

    next() {
        this.seed = (this.multiplier * this.seed + this.increment) % this.modulus;
        return this.seed / this.modulus;
    }
}

// export default SeededRNG;