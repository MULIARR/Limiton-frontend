import { create } from 'zustand';
import TONlogo from "../../../assets/ton.png";


/**
 * useSwapStore відповідає за стан та бізнес-логіку самого свопу.
 * Тут зберігатимуться токени, суми відправки/отримання, розраховані курси,
 * прибутку, сліпpage, а також методи для оновлення цих даних.
 */

const useSwapStore = create((set, get) => ({

  sendJetton: {
    address: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c', 
    symbol: 'TON',
    name: 'Toncoin',
    image: TONlogo,
    balance: 1000,
    decimals: 9,
  },
  receiveJetton: null,

  sendAmount: '',
  receiveAmount: '',

  sendAmountRate: 0,
  receiveAmountRate: 0,
  profit: '',
  profitInUSD: 0,

  slippage: 1,
  isAmountRatesLoaded: true,
  receiveSwapDataLoaded: false,
  isPoolExist: false,

  isUpdateButtonIconRoating: false,
  isSwapButtonIconRoating: false,


  setReceiveAmount: (amount) => set({ receiveAmount: amount }),
  setSendAmountRate: (rate) => set({ sendAmountRate: rate }),
  setReceiveAmountRate: (rate) => set({ receiveAmountRate: rate }),
  setProfit: (value) => set({ profit: value }),
  setProfitInUSD: (value) => set({ profitInUSD: value }),
  setIsAmountRatesLoaded: (loaded) => set({ isAmountRatesLoaded: loaded }),
  setReceiveSwapDataLoaded: (loaded) => set({ receiveSwapDataLoaded: loaded }),
  setIsPoolExist: (exist) => set({ isPoolExist: exist }),
  setSlippage: (value) => set({ slippage: value }),

  setSendJetton: (jetton) => set({ sendJetton: jetton }),
  setReceiveJetton: (jetton) => set({ receiveJetton: jetton }),

  setSendAmount: (amount) => set({ sendAmount: amount }),


  calculateMinimumReceived: () => {
    const { receiveAmount, slippage } = get();
    const minimumReceived = Number(receiveAmount) - (Number(receiveAmount) * slippage / 100);
    set({ minimumReceived });
  },

  isOrderDataReady: () => {
    const { sendJetton, receiveJetton, sendAmount, receiveAmount, isPoolExist } = get();
    return sendJetton && receiveJetton && sendAmount && receiveAmount && isPoolExist;
  },

  isMainSwapButtonDisabled: () => {
    const { sendAmount, receiveAmount, isPoolExist } = get();
    return !isPoolExist || !sendAmount || !receiveAmount;
  },

  getMainSwapButtonText: () => {
    const { receiveJetton, isPoolExist, sendAmount, receiveAmount } = get();
    if (!receiveJetton) {
      return "Select receive token";
    }
    if (!isPoolExist) {
      return "Liquidity pool not found";
    }
    if (!sendAmount || parseFloat(sendAmount) === 0 || !receiveAmount || parseFloat(receiveAmount) === 0) {
      return "Enter amount";
    }
    return "Confirm limit order";
  },

  handleUpdateSwapButtonClick: (estimateSwap) => {
    set({ isUpdateButtonIconRoating: true });
    estimateSwap().finally(() => {
      set({ isUpdateButtonIconRoating: false });
    });
  },

  handleSwap: () => {
    const { sendJetton, receiveJetton, sendAmount, receiveAmount } = get();

    if (receiveAmount !== '') {
      set({
        sendJetton: receiveJetton,
        receiveJetton: sendJetton,
        sendAmount: receiveAmount,
        receiveAmount: sendAmount,
        isSwapButtonIconRoating: true
      });
      setTimeout(() => {
        set({ isSwapButtonIconRoating: false });
      }, 200);
    }
  },
}));

export default useSwapStore;
