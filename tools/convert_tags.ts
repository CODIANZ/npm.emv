/** do `npx ts-node convert_tags.ts` for convert to json */
/** from EMV 4.4 Book 3 - A2 Data Elements by Tag */
const str = `
Issuer Identification Number (IIN) 'BF0C' or '73' '42'
Application Dedicated File (ADF) Name '61' '4F'
Application Label '61' or 'A5' '50'
Track 2 Equivalent Data '70' or '77' '57'
Application Primary Account Number (PAN) '70' or '77' '5A'
Cardholder Name '70' or '77' '5F20'
Application Expiration Date '70' or '77' '5F24'
Application Effective Date '70' or '77' '5F25'
Issuer Country Code '70' or '77' '5F28'
Transaction Currency Code — '5F2A'
Language Preference 'A5' '5F2D'
Service Code '70' or '77' '5F30'
Application Primary Account Number (PAN) Sequence Number '70' or '77' '5F34'
Transaction Currency Exponent — '5F36'
Issuer URL 'BF0C' or '73' '5F50'
International Bank Account Number (IBAN) 'BF0C' or '73' '5F53'
Bank Identifier Code (BIC) 'BF0C' or '73' '5F54'
Issuer Country Code (alpha2 format) 'BF0C' or '73' '5F55'
Issuer Country Code (alpha3 format) 'BF0C' or '73' '5F56'
Account Type — '5F57'
Application Template '70' or '77' '61'
File Control Information (FCI) Template — '6F'
READ RECORD Response Message Template — '70'
Issuer Script Template 1 — '71'
Issuer Script Template 2 — '72'
Directory Discretionary Template '61' '73'
Response Message Template Format 2 — '77'
Biometric Information Template (BIT), card 'BF4A' or 'BF4B' '7F60'
Biometric Information Template (BIT), terminal – '7F60'
Response Message Template Format 1 — '80'
Amount, Authorised (Binary) — '81'
Biometric Type 'A1' or 'BF4E' '81'
Application Interchange Profile '77' or '80' '82'
Biometric Subtype 'A1' '82'
Command Template — '83'
Dedicated File (DF) Name '6F' '84'
Issuer Script Command '71' or '72' '86'
Application Priority Indicator '61' or 'A5' '87'
Short File Identifier (SFI) 'A5' '88'
Authorisation Code — '89'
Authorisation Response Code — '8A'
Card Risk Management Data Object List 1 (CDOL1) '70' or '77' '8C'
Card Risk Management Data Object List 2 (CDOL2) '70' or '77' '8D'
Cardholder Verification Method (CVM) List '70' or '77' '8E'
Certification Authority Public Key Index '70' or '77' '8F'
Issuer Public Key Certificate '70' or '77' '90'
Biometric Solution ID 'A1' or 'BF4E' '90'
Issuer Authentication Data — '91'
Issuer Public Key Remainder '70' or '77' '92'
Signed Static Application Data '70' or '77' '93'
Application File Locator (AFL) '77' or '80' '94'
Terminal Verification Results — '95'
Transaction Certificate Data Object List (TDOL) '70' or '77' '97'
Transaction Certificate (TC) Hash Value — '98'
Transaction Personal Identification Number (PIN) Data — '99'
Transaction Date — '9A'
Transaction Status Information — '9B'
Transaction Type — '9C'
Directory Definition File (DDF) Name '61' '9D'
Acquirer Identifier — '9F01'
Amount, Authorised (Numeric) — '9F02'
Amount, Other (Numeric) — '9F03'
Amount, Other (Binary) — '9F04'
Application Discretionary Data '70' or '77' '9F05'
Application Identifier (AID) – terminal — '9F06'
Application Usage Control '70' or '77' '9F07'
Application Version Number '70' or '77' '9F08'
Application Version Number — '9F09'
Application Selection Registered Proprietary Data (ASRPD) '73' '9F0A'
Cardholder Name Extended '70' or '77' '9F0B'
Issuer Identification Number Extended (IINE) 'BF0C' or '73' '9F0C'
Issuer Action Code – Default '70' or '77' '9F0D'
Issuer Action Code – Denial '70' or '77' '9F0E'
Issuer Action Code – Online '70' or '77' '9F0F'
Issuer Application Data '77' or '80' '9F10'
Issuer Code Table Index 'A5' '9F11'
Application Preferred Name '61' or 'A5' '9F12'
Last Online Application Transaction Counter (ATC) Register — '9F13'
Lower Consecutive Offline Limit '70' or '77' '9F14'
Merchant Category Code — '9F15'
Merchant Identifier — '9F16'
Personal Identification Number (PIN) Try Counter — '9F17'
Issuer Script Identifier '71' or '72' '9F18'
Token Requestor ID '70' or '77' '9F19'
Terminal Country Code — '9F1A'
Terminal Floor Limit — '9F1B'
Terminal Identification — '9F1C'
Terminal Risk Management Data — '9F1D'
Interface Device (IFD) Serial Number — '9F1E'
Track 1 Discretionary Data '70' or '77' '9F1F'
Track 2 Discretionary Data '70' or '77' '9F20'
Transaction Time — '9F21'
Certification Authority Public Key Index — '9F22'
Upper Consecutive Offline Limit '70' or '77' '9F23'
Payment Account Reference (PAR) '70' or '77' '9F24'
Last 4 Digits of PAN '70' or '77' '9F25'
Application Cryptogram '77' or '80' '9F26'
Cryptogram Information Data '77' or '80' '9F27'
ICC PIN Encipherment Public Key Certificate (RSA) or
Integrated Circuit Card (ICC) Public Key Certificate for ODE (ECC) '70' or '77' '9F2D'
ICC PIN Encipherment Public Key Exponent '70' or '77' '9F2E'
ICC PIN Encipherment Public Key Remainder '70' or '77' '9F2F'
Biometric Terminal Capabilities – '9F30'
Card BIT Group Template '70' '9F31'
Issuer Public Key Exponent '70' or '77' '9F32'
Terminal Capabilities — '9F33'
Cardholder Verification Method (CVM) Results — '9F34'
Terminal Type — '9F35'
Application Transaction Counter (ATC) '77' or '80' '9F36'
Unpredictable Number — '9F37'
Processing Options Data Object List (PDOL) 'A5' '9F38'
Point-of-Service (POS) Entry Mode — '9F39'
Amount, Reference Currency — '9F3A'
Application Reference Currency '70' or '77' '9F3B'
Transaction Reference Currency Code — '9F3C'
Transaction Reference Currency Exponent — '9F3D'
Additional Terminal Capabilities — '9F40'
Transaction Sequence Counter — '9F41'
Application Currency Code '70' or '77' '9F42'
Application Reference Currency Exponent '70' or '77' '9F43'
Application Currency Exponent '70' or '77' '9F44'
Data Authentication Code — '9F45'
ICC Public Key Certificate '70' or '77' '9F46'
ICC Public Key Exponent '70' or '77' '9F47'
ICC Public Key Remainder '70' or '77' '9F48'
Dynamic Data Authentication Data Object List (DDOL) '70' or '77' '9F49'
Static Data Authentication Tag List '70' or '77' '9F4A'
Signed Dynamic Application Data '77' or '80' '9F4B'
ICC Dynamic Number — '9F4C'
Log Entry 'BF0C' or '73' '9F4D'
Merchant Name and Location — '9F4E'
Log Format — '9F4F'
Biometric Header Template (BHT) '7F60' 'A1'
File Control Information (FCI) Proprietary Template '6F' 'A5'
File Control Information (FCI) Issuer Discretionary Data 'A5' 'BF0C'
Offline BIT Group Template '9F31' 'BF4A'
Online BIT Group Template '9F31' 'BF4B'
Biometric Try Counters Template – 'BF4C'
Preferred Attempts Template – 'BF4D'
Biometric Verification Data Template – 'BF4E'
Facial Try Counter 'BF4C' 'DF50'
Preferred Facial Attempts 'BF4D' 'DF50'
Enciphered Biometric Key Seed 'BF4E' 'DF50'
Finger Try Counter 'BF4C' 'DF51'
Preferred Finger Attempts 'BF4D' 'DF51'
Enciphered Biometric Data 'BF4E' 'DF51'
Iris Try Counter 'BF4C' 'DF52'
Preferred Iris Attempts 'BF4D' 'DF52'
MAC of Enciphered Biometric Data 'BF4E' 'DF52'
Palm Try Counter 'BF4C' 'DF53'
Preferred Palm Attempts 'BF4D' 'DF53'
Voice Try Counter 'BF4C' 'DF54'
Preferred Voice Attempts 'BF4D' 'DF54'
`;

const tagList = str.split('\n').map((line) => {
  const hex = (s: string | null | undefined) => {
    if (s === null || s === undefined) return undefined;
    const match = s.match(/^'([0-9A-F]+)'$/);
    if (match === null) return undefined;
    return match[1];
  }

  const arr = line.split(/\s+/).filter(s => s.length > 0).reverse();

  const tag = hex(arr[0]);
  if(tag === undefined) return undefined;
  arr.shift();

  const templ: string[] = [];
  while(arr.length > 0) {
    const s = hex(arr[0]);
    if(s === undefined){
      if(arr[0] === "—"){
        arr.shift();
        break;
      }
      if(arr[0] !== "or"){
        break;
      }
    }
    else {
      templ.push(s);
    }
    arr.shift();
  }

  return { tag, template: templ, name: arr.reverse().join(' ') };
}).filter(line => line !== undefined);

console.log(JSON.stringify(tagList));
