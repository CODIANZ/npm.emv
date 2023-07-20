import {data_chunk_holder} from "./data_chunk_holder"
import {data_chunk} from "./data_chunk"
import { EmvTags } from "./emv_tags";


export namespace TLV {

export enum class_type {
  invalid = 0xFF,
  universal = 0x00,
  application = 0x40,
  context_specific = 0x80,
  private_use = 0xC0,
}

export class tag extends data_chunk_holder {
  public constructor(data?: data_chunk){
    super(data);
  }
  public static create_from_data_chunk(src: data_chunk): tag {
    do {
      if(!src.valid) break;
      let idx = 0;
      const _0 = src.get_byte(idx);
      if(_0 === undefined) break;
      idx++;
      if((_0 & 0x1F) != 0x1F) {
        return new tag(src.get_range(0, 1));
      }
      while(true){
        const d = src.get_byte(idx);
        if(d === undefined) break;
        idx++;
        if((d & 0x80) == 0) {
          return new tag(src.get_range(0, idx));
        }
      }
    } while (false);
    return new tag();
  }
  public static create_from_uint8array(src: Uint8Array, offset?: number, length?: number): tag {
    return tag.create_from_data_chunk(data_chunk.create_from_uint8array(src, 0, src.length));
  }
  public static create_from_hex_string(str: string): tag {
    return tag.create_from_data_chunk(data_chunk.create_from_hex_string(str));
  }
  public get class_type(): class_type {
    if(!this.valid) return class_type.invalid;
    const _0 = this.data_chunk.get_byte(0);
    if(_0 === undefined) return class_type.invalid;
    return _0 & 0xC0;
  }
  public get is_constructed(): boolean {
    if(!this.valid) return false;
    const _0 = this.data_chunk.get_byte(0);
    if(_0 === undefined) return false;
    return (_0 & 0x20) != 0;
  }
  public get is_primitive(): boolean {
    return !this.is_constructed;
  }
}

export class length extends data_chunk_holder {
  private m_value_length: number = 0;
  public constructor(data?: data_chunk, value_length?: number){
    super(data);
    this.m_value_length = value_length ?? 0;
  }
  public static create_from_tag_and_data_chunk(tag: tag, src: data_chunk): length {
    do{
      if(!tag.valid) break;
      if(!src.valid) break;
      return this.craete_from_data_chunk(src.get_range(tag.size, src.size - tag.size));
    } while(false);
    return new length();
  }
  public static craete_from_data_chunk(src: data_chunk): length {
    do{
      if(!src.valid) break;
      let idx = 0;
      const _0 = src.get_byte(idx);
      if(_0 === undefined) break;
      idx++;
      if((_0 & 0x80) == 0) {
        return new length(src.get_range(0, 1), _0);
      }
      const _length = _0 & 0x7F;
      if(_length == 0) break;
      if(_length > 8) break;
      let value_length = 0;
      for(let i = 0; i < _length; i++) {
        const d = src.get_byte(idx);
        if(d === undefined) break;
        idx++;
        value_length = (value_length << 8) | d;
      }
      return new length(src.get_range(0, idx), value_length);
    } while(false);
    return new length();
  }
  public get value_length(): number {
    return this.m_value_length;
  }
}

export class value extends data_chunk_holder {
  public constructor(data?: data_chunk){
    super(data);
  }
  public static create_from_tag_and_length_and_data_chunk(tag: tag, length: length, src: data_chunk): value {
    do{
      if(!tag.valid) break;
      if(!length.valid) break;
      if(!src.valid) break;
      if(src.size <(tag.size + length.size + length.value_length)) break;
      return new value(src.get_range(tag.size + length.size, length.value_length));
    } while(false);
    return new value();
  }
}
} /* namespace tlv */

export class tlv {
  private m_tag: TLV.tag;
  private m_length: TLV.length;
  private m_value: TLV.value;
  private m_children: tlv[] = [];
  private constructor(tag?: TLV.tag, length?: TLV.length, value?: TLV.value){
    this.m_tag = tag ?? new TLV.tag();
    this.m_length = length ?? new TLV.length();
    this.m_value = value ?? new TLV.value();
    if(this.valid && this.tag.is_constructed) {
      let idx = 0;
      const src = this.value.data_chunk;
      while(idx < src.size) {
        const child = tlv.create_from_data_chunk(src.get_range(idx, src.size - idx));
        if(!child.valid) break;
        this.m_children.push(child);
        idx += child.size;
      }
    }
  }
  public static create_from_data_chunk(src: data_chunk): tlv {
    if(!src.valid) return new tlv();
    const tag = TLV.tag.create_from_data_chunk(src);
    const length = TLV.length.create_from_tag_and_data_chunk(tag, src);
    const value = TLV.value.create_from_tag_and_length_and_data_chunk(tag, length, src);
    return new tlv(tag, length, value);
  }
  public get valid(): boolean {
    return this.m_tag.valid && this.m_length.valid && this.m_value.valid;
  }
  public get size() {
    return this.m_tag.size + this.m_length.size + this.m_value.size;
  }
  public get tag(): TLV.tag {
    return this.m_tag;
  }
  public get length(): TLV.length {
    return this.m_length;
  }
  public get value(): TLV.value {
    return this.m_value;
  }
  public get children(): tlv[] {
    return this.m_children;
  }
  public find_children(tag: TLV.tag): tlv[] {
    const result: tlv[] = [];
    for(const child of this.m_children) {
      if(child.tag.equals(tag)) result.push(child);
    }
    return result;
  }
  public find_first_child(tag: TLV.tag): tlv {
    for(const child of this.m_children) {
      if(child.tag.equals(tag)) return child;
    }
    return new tlv();
  }
  public to_string(indent: number = 0, parentTag?: TLV.tag): string {
    if(!this.valid) return "(invalid tlv)";
    
    const class_type_to_string = (class_type: TLV.class_type): string => {
      switch(class_type) {
        case TLV.class_type.invalid: return "invalid";
        case TLV.class_type.universal: return "universal";
        case TLV.class_type.application: return "application";
        case TLV.class_type.context_specific: return "context_specific";
        case TLV.class_type.private_use: return "private_use";
      }
    };

    const tag_name = (() => {
      const infos = EmvTags.Instance.findByTag(this.tag.to_hex_string());
      if(infos.length == 0) {
        return this.tag.is_constructed ? "unknown template" : "unknown value";
      }
      const target = infos.find(info => {
        if(info.length){
          if(info.length != this.length.value_length) return false;
        }
        return info.template.find(x => x == parentTag?.to_hex_string()) != undefined;
      });
      if(target) return target.name;
      if(parentTag === undefined) return infos[0].name;
      return `${infos[0].name} (?)`;
    })();

    const value_string = (() => {
      const s = this.value.to_string_if_printable();
      return s ? `"${s}"` : "";
    })();

    const _i = "  ".repeat(indent);
    let result = "";

    result += _i + `tag: ${this.tag.data_chunk.to_hex_string()} (${tag_name})\n`;
    // result += _i + ` - class_type: ${class_type_to_string(this.tag.class_type)}\n`;
    // result += _i + ` - is_constructed: ${this.tag.is_constructed}\n`;
    // result += _i + ` - is_premitive: ${this.tag.is_primitive}\n`;
    result += _i + `length: ${this.length.data_chunk.to_hex_string()} (${this.length.value_length})\n`;
    result += _i + `value: ${this.value.data_chunk.to_hex_string()} ${value_string}\n`;
    
    if(this.children.length == 0) return result;

    result += _i + "children:\n";
    for(let i = 0; i < this.children.length; i++) {
      result += _i + `[${i}]\n`;
      result += this.children[i].to_string(indent + 1, this.tag);
    }
    return result;
  }
}
