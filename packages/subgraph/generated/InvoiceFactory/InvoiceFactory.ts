// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class InvoiceCreated extends ethereum.Event {
  get params(): InvoiceCreated__Params {
    return new InvoiceCreated__Params(this);
  }
}

export class InvoiceCreated__Params {
  _event: InvoiceCreated;

  constructor(event: InvoiceCreated) {
    this._event = event;
  }

  get tokenID(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class InvoiceFactory extends ethereum.SmartContract {
  static bind(address: Address): InvoiceFactory {
    return new InvoiceFactory("InvoiceFactory", address);
  }

  factoring(): Address {
    let result = super.call("factoring", "factoring():(address)", []);

    return result[0].toAddress();
  }

  try_factoring(): ethereum.CallResult<Address> {
    let result = super.tryCall("factoring", "factoring():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  idCount(): BigInt {
    let result = super.call("idCount", "idCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_idCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("idCount", "idCount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  invoice(): Address {
    let result = super.call("invoice", "invoice():(address)", []);

    return result[0].toAddress();
  }

  try_invoice(): ethereum.CallResult<Address> {
    let result = super.tryCall("invoice", "invoice():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _factoring(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _invoice(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateInvoiceCall extends ethereum.Call {
  get inputs(): CreateInvoiceCall__Inputs {
    return new CreateInvoiceCall__Inputs(this);
  }

  get outputs(): CreateInvoiceCall__Outputs {
    return new CreateInvoiceCall__Outputs(this);
  }
}

export class CreateInvoiceCall__Inputs {
  _call: CreateInvoiceCall;

  constructor(call: CreateInvoiceCall) {
    this._call = call;
  }

  get client(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get fractions(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get fractionalPrice(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get repaymentAmount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get invoiceURI(): string {
    return this._call.inputValues[4].value.toString();
  }

  get token(): Address {
    return this._call.inputValues[5].value.toAddress();
  }
}

export class CreateInvoiceCall__Outputs {
  _call: CreateInvoiceCall;

  constructor(call: CreateInvoiceCall) {
    this._call = call;
  }
}
