export = BitByte;
/** Class representing a byte. */
declare class BitByte {
    /**
     * Create a byte.
     * @param {number|number[]|boolean[]} initialData - Unsigned byte integer or bits array.
     */
    constructor(initialData?: number | number[] | boolean[]);
    data: number[];
    /**
     * Change bit on a given offset.
     * @param {number} offset - Bit offset.
     * @param {number|boolean} bit - Bit.
     * @returns {number} - Bit.
     */
    setBit(offset: number, bit: number | boolean): number;
    /**
     * Get bit on a given offset.
     * @param {number} offset - Bit offset.
     * @returns {number} - Bit.
     */
    getBit(offset: number): number;
    /**
     * Get local storage of bits as an unsigned byte integer.
     * @returns {number} - Unsigned byte integer.
     */
    getByte(): number;
    /**
     * Get local storage of bits as ASCII character.
     * @returns {string} - ASCII character.
     */
    getChar(): string;
    /**
     * Get local storage of bits as string.
     * @returns {string} - String representation of local storage of bits.
     */
    toString(): string;
    /**
     * Get local storage of bits an unsigned byte integer.
     * @returns {string} - Unsigned byte integer.
     */
    valueOf(): string;
    /**
     * Assign array of bits to an instance.
     * @param {number[]|boolean[]} bits - Bits array.
     * @param {number} - Assign offset.
     * @returns {boolean} - Returns true if no errors found.
     */
    assign(bits: number[] | boolean[], offset?: number): boolean;
}
declare namespace BitByte {
    /**
     * Get class representing an array of bits with index assign checks.
     * @returns {BitByteArray}
     */
    function safe(...args: any[]): any;
}
