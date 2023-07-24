import * as emv from "../src";

{
  const x = emv.data_chunk.invalid();
  console.log(x.valid);
  console.log(x.empty);
  console.log(x.size);
  try{
    console.log(x.get_range(0));
  }catch(e: any){
    console.log(e.message);
  }
  try{
    console.log(x.get_byte(0));
  }catch(e: any){
    console.log(e.message);
  }
}

{
  const x = emv.data_chunk.create_from_hex_string('0x01020304');
  console.log(x.valid);
  console.log(x.empty);
  console.log(x.size);
  console.log(x.get_range(0));
  console.log(x.get_range(0, 1));
  console.log(x.get_range(0, 2));
  console.log(x.get_range(0, 3));
  for(const y of x){
    console.log(y);
  }
  console.log("-----");
  for(const y of x.get_range(1, 2)){
    console.log(y);
  }
}

{
  const chunk = emv.data_chunk.create_from_hex_string("6F2B800205A0810205A0820139830200008410616263642D313233343536372E637274850100860100870200009000");
  const rapdu = emv.rapdu.create_from_data_chunk(chunk);
  const tlv = rapdu.get_tlv();

  console.log(`status word: ${rapdu.status_word.sw1sw2.toString(16)}`);
  console.log(tlv.to_string());
  const tag_84 = tlv.find_first_child(emv.TLV.tag.create_from_hex_string("84"));
  if(tag_84.valid){
    console.log(`tag 84: ${tag_84.value.to_string()}`);
  }
}


{
  emv.EmvTags.Instance.addPrivateTags([{tag: "DFDF10", "name": "Test Tag", "template": ["6F"]}])
  const chunk = emv.data_chunk.create_from_hex_string("6F30DFDF1001FF800205A0810205A0820139830200008410616263642D313233343536372E637274850100860100870200009000");
  const rapdu = emv.rapdu.create_from_data_chunk(chunk);
  const tlv = rapdu.get_tlv();

  console.log(`status word: ${rapdu.status_word.sw1sw2.toString(16)}`);
  console.log(tlv.to_string());
  const tag_84 = tlv.find_first_child(emv.TLV.tag.create_from_hex_string("84"));
  if(tag_84.valid){
    console.log(`tag 84: ${tag_84.value.to_string()}`);
  }
}