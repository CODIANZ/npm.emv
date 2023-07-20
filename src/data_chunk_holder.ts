import "./data_chunk"
import { data_chunk } from "./data_chunk"

export class data_chunk_holder {
  private m_data_chunk: data_chunk;
  protected constructor(data?: data_chunk){
    this.m_data_chunk = data ?? data_chunk.invalid();
  }
  public get data_chunk(): data_chunk {
    return this.m_data_chunk;
  }
  public get valid(): boolean {
    return this.m_data_chunk.valid;
  }
  public get empty(): boolean {
    return this.m_data_chunk.empty;
  }
  public get size(): number {
    return this.m_data_chunk.size;
  }
  public equals(other: data_chunk_holder): boolean {
    return this.m_data_chunk.equals(other.m_data_chunk);
  }
  public to_hex_string(): string {
    return this.m_data_chunk.to_hex_string();
  }
  public to_string(): string {
    return this.m_data_chunk.to_string();
  }
  public to_string_if_printable(): string | undefined {
    return this.m_data_chunk.to_string_if_printable();
  }
  public to_uint8(): number {
    return this.m_data_chunk.to_uint8();
  }
  public to_uint16(): number {
    return this.m_data_chunk.to_uint16();
  }
  public to_uint32(): number {
    return this.m_data_chunk.to_uint32();
  }

  public [Symbol.iterator](): Iterator<number, undefined> {
    return this.m_data_chunk[Symbol.iterator]();
  }

  public get iter(): Iterator<number, undefined> {
    return this.m_data_chunk.iter;
  }
}