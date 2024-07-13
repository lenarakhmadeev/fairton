import {
  Contract,
  ContractProvider,
  Sender,
  Address,
  Cell,
  contractAddress,
  beginCell,
  SendMode
} from "ton-core";

export default class Counter implements Contract {
  static createForDeploy(code: Cell, initialCounterValue: number): Counter {
    const data = beginCell().storeUint(initialCounterValue, 64).endCell();
    const workchain = 0; // deploy to workchain 0
    const address = contractAddress(workchain, { code, data });
    return new Counter(address, { code, data });
  }

  async sendDeploy(provider: ContractProvider, via: Sender) {
    await provider.internal(via, {
      value: "0.01", // send 0.01 TON to contract for rent
      bounce: false,
    });
  }

  async getCounter(provider: ContractProvider) {
    console.log("GET")
    const { stack } = await provider.get("get_last_price", []);
    return stack.readBigNumber();
  }

  async sendIncrement(provider: ContractProvider, via: Sender) {
    await provider.internal(via, {
      value: "0.005",
      sendMode: SendMode.PAY_GAS_SEPARATLY,
      body: beginCell()
          .storeUint(0x7e8764ef, 32)
          .storeUint(0, 64)
          .storeUint(2, 32)
          .endCell(),
    });
    //
    //
    //
    //
    // const messageBody = beginCell()
    //   .storeUint(1, 32) // op (op #1 = increment)
    //   .storeUint(0, 64) // query id
    //   .storeUint(7, 32)
    //   .endCell();
    // await provider.internal(via, {
    //   value: "0.002", // send 0.002 TON for gas
    //   body: messageBody,
    // });
  }

  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}
}
