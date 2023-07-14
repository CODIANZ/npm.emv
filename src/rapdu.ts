import { data_chunk } from "./data_chunk";
import { data_chunk_holder } from "./data_chunk_holder";
import { TLV, tlv } from "./tlv";


export namespace RAPDU {
export class status_word extends data_chunk_holder {
  public constructor(data?: data_chunk){
    super(data);
  }
  static create_from_data_chunk(src: data_chunk): status_word {
    do{
      if(!src.valid) break;
      if(src.size < 2) break;
      return new status_word(src.get_range(0, 2));
    } while(false);
    return new status_word();
  }
  public get sw1sw2(): number {
    return (this.sw1 << 8) | this.sw2;
  }
  public get sw1(): number {
    if(!this.valid) throw new Error("invalid status_word");
    const _0 = this.data_chunk.get_byte(0);
    if(_0 === undefined) throw new Error("invalid status_word");
    return _0;
  } 
  public get sw2(): number {
    if(!this.valid) throw new Error("invalid status_word");
    const _0 = this.data_chunk.get_byte(1);
    if(_0 === undefined) throw new Error("invalid status_word");
    return _0;
  }
  public get is_ok(): boolean {
    return this.sw1sw2 == 0x9000;
  }
}
} /** namespace RAPDU */

export class rapdu {
  m_data_chunk: data_chunk;
  m_status_word: RAPDU.status_word;
  public constructor(data?: data_chunk, status_word?: RAPDU.status_word){
    this.m_data_chunk = data ?? new data_chunk();
    this.m_status_word = status_word ?? new RAPDU.status_word();
  }
  public static create_from_data_chunk(src: data_chunk): rapdu {
    do{
      if(!src.valid) break;
      if(src.size < 2) break;
      const data = src.get_range(0, src.size - 2);
      const sw = src.get_range(src.size - 2, 2);
      return new rapdu(data, RAPDU.status_word.create_from_data_chunk(sw));
    } while(false);
    return new rapdu();
  }
  public get valid(): boolean {
    return this.m_data_chunk.valid && this.m_status_word.valid;
  }
  public get data_chunk(): data_chunk {
    return this.m_data_chunk;
  }
  public get status_word(): RAPDU.status_word {
    return this.m_status_word;
  }
  public get_tlv(): tlv {
    return tlv.create_from_data_chunk(this.m_data_chunk);
  }
}