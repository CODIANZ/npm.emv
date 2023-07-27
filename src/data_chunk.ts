export class data_chunk {
  private m_data?: Uint8Array;
  private m_offset: number = 0;
  private m_length: number = 0;

  public constructor(data?: Uint8Array, offset?: number, length?: number){
    this.m_data = data;
    if(data){
      this.m_offset = offset ?? 0;
      this.m_length = length ?? data.length;
    }
  }
  public static invalid(): data_chunk {
    return new data_chunk();
  }
  private static string_to_uint8array(s: string): Uint8Array
  {
    const charcode_to_hex = (c: number): number | undefined => {
      if(c >= 0x30 && c <= 0x39){
        return c - 0x30;
      }
      else if(c >= 0x41 && c <= 0x46){
        return c - 0x41 + 10;
      }
      else if(c >= 0x61 && c <= 0x66){
        return c - 0x61 + 10;
      }
      return undefined;
    };

    const r = new Uint8Array(s.length / 2);
    let wp = 0;
    for(let i = 0; i < s.length; i+= 2){
      const u = charcode_to_hex(s.charCodeAt(i));
      const l = charcode_to_hex(s.charCodeAt(i + 1));
      if(u === undefined || l === undefined){
        break;
      }
      r[wp++] = (u << 4) | l;
    }
    return r.subarray(0, wp);
  }
  public static create_from_hex_string(str: string): data_chunk {
    const s = str.replace(/0x/g, "").replace(/\s/g, "").replace(/,/g, "");
    if(s.length % 2 !== 0){
      throw new Error("wrong length");
    }
    const data = data_chunk.string_to_uint8array(s);
    return new data_chunk(data);
  }
  public static create_from_hex_string_loosey(str: string): data_chunk {
    const s = str.replace(/0x/g, "").replace(/\s/g, "").replace(/,/g, "");
    const data = data_chunk.string_to_uint8array(s);
    return new data_chunk(data);
  }
  public get valid(): boolean {
    return this.m_data !== undefined;
  }
  public get empty(): boolean {
    return this.m_length === 0;
  }
  public get size(): number {
    return this.m_length;
  }
  public static create_from_uint8array(src: Uint8Array, offset?: number, length?: number): data_chunk {
    return new data_chunk(src, offset, length);
  }
  public get_range(offset: number, length?: number): data_chunk {
    if(offset < 0 || offset >= this.m_length){
      throw new Error("Out of range");
    }
    if(length === undefined){
      length = this.m_length - offset;
    }
    if(offset + length > this.m_length){
      throw new Error("Out of range");
    }
    return new data_chunk(this.m_data, this.m_offset + offset, length);
  }
  public get_byte(offset: number): number | undefined {
    if(!this.m_data) return undefined;
    if(offset < 0 || offset >= this.m_length){
      return undefined;
    }
    return this.m_data[this.m_offset + offset];
  }
  public equals(other: data_chunk): boolean {
    if(!this.m_data || !other.m_data) return false;
    if(this.m_data === other.m_data && this.m_offset === other.m_offset && this.m_length === other.m_length){
      return true;
    }
    if(this.m_length !== other.m_length){
      return false;
    }
    for(let i = 0; i < this.m_length; ++i){
      if(this.m_data[this.m_offset + i] !== other.m_data[other.m_offset + i]){
        return false;
      }
    }
    return true;
  }
  public to_hex_string(): string {
    let s = "";
    if(!this.m_data) return s;
    for(let i = 0; i < this.m_length; ++i){
      s += ("0" + this.m_data[this.m_offset + i].toString(16)).slice(-2);
    }
    return s.toUpperCase();
  }
  public to_string(): string {
    let s = "";
    if(!this.m_data) return s;
    for(let i = 0; i < this.m_length; ++i){
      s += String.fromCharCode(this.m_data[this.m_offset + i]);
    }
    return s;
  }
  public to_string_if_printable(): string | undefined {
    let s = "";
    if(!this.m_data) return undefined;
    for(let i = 0; i < this.m_length; ++i){
      const c = this.m_data[this.m_offset + i];
      if(0x20 <= c && c <= 0x7E){
        s += String.fromCharCode(this.m_data[this.m_offset + i]);
      }
      else{
        return undefined;
      }
    }
    return s;
  }
  public to_uint8_array(): Uint8Array {
    if(this.valid && this.m_data){
      return this.m_data.subarray(this.m_offset, this.m_offset + this.m_length);
    }
    else{
      throw new Error("Invalid data");
    }
  }
  public to_uint8(): number {
    if(this.m_data === undefined){
      throw new Error("Invalid data");
    }
    return this.m_data[this.m_offset];
  }
  public to_uint16(): number {
    if(this.m_data === undefined){
      throw new Error("Invalid data");
    }
    return (this.m_data[this.m_offset] << 8) | this.m_data[this.m_offset + 1];
  }
  public to_uint32(): number {
    if(this.m_data === undefined){
      throw new Error("Invalid data");
    }
    return (this.m_data[this.m_offset] << 24) | (this.m_data[this.m_offset + 1] << 16) | (this.m_data[this.m_offset + 2] << 8) | this.m_data[this.m_offset + 3];
  }

  public [Symbol.iterator](): Iterator<number, undefined> {
    let index = 0;
    const chunk = this;

    return {
      next(): IteratorResult<number, undefined> {
        if(chunk.m_data === undefined){
          return { value: undefined, done: true };
        }
        else if(index < chunk.m_length) {
          const value = chunk.m_data[chunk.m_offset + index];
          index++;
          return { value, done: false };
        }
        else{
          return { value: undefined, done: true };
        }
      }
    };
  }

  public get iter(): Iterator<number, undefined> {
    return this[Symbol.iterator]();
  }
}
