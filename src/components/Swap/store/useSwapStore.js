import { create } from 'zustand';
import TONlogo from "../../../assets/ton.png";


/**
 * useSwapStore отвечает за состояние и бизнес-логику самого свопа.
 * Здесь будут храниться токены, суммы отправки/получения, рассчитанные курсы,
 * прибыли, слippage, а также методы для обновления этих данных.
 */

const useSwapStore = create((set, get) => ({
  // Состояния для токенов
  sendJetton: {
    address: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',    // Подставьте дефолтные значения или изначальные объекты
    symbol: 'TON',  // Примерно
    name: 'Toncoin',
    image: TONlogo,
    balance: 1000,
    decimals: 9,
  },
  receiveJetton: null,

  // Состояния для сумм
  sendAmount: '',
  receiveAmount: '',

  // Состояния для рассчитанных валютных курсов и прибыли
  sendAmountRate: 0,
  receiveAmountRate: 0,
  profit: '',
  profitInUSD: 0,

  // Прочие настройки
  slippage: 1,
  isAmountRatesLoaded: true,
  receiveSwapDataLoaded: false,
  isPoolExist: false,

  // Состояния для анимаций (при желании можно оставить их или убрать)
  isUpdateButtonIconRoating: false,
  isSwapButtonIconRoating: false,

  // Методы для установки состояния

  setReceiveAmount: (amount) => set({ receiveAmount: amount }),
  setSendAmountRate: (rate) => set({ sendAmountRate: rate }),
  setReceiveAmountRate: (rate) => set({ receiveAmountRate: rate }),
  setProfit: (value) => set({ profit: value }),
  setProfitInUSD: (value) => set({ profitInUSD: value }),
  setIsAmountRatesLoaded: (loaded) => set({ isAmountRatesLoaded: loaded }),
  setReceiveSwapDataLoaded: (loaded) => set({ receiveSwapDataLoaded: loaded }),
  setIsPoolExist: (exist) => set({ isPoolExist: exist }),
  setSlippage: (value) => set({ slippage: value }),

  // Пример: метод для смены токена отправки (простейшая реализация)
  setSendJetton: (jetton) => set({ sendJetton: jetton }),
  // Пример: метод для смены токена получения
  setReceiveJetton: (jetton) => set({ receiveJetton: jetton }),

  // Пример: метод для установки отправляемой суммы
  setSendAmount: (amount) => set({ sendAmount: amount }),

  // Методы, которые используют текущее состояние для вычислений или действий

  calculateMinimumReceived: () => {
    const { receiveAmount, slippage } = get();
    // Примерный расчет: минимально получаемая сумма = receiveAmount - (receiveAmount * slippage/100)
    const minimumReceived = Number(receiveAmount) - (Number(receiveAmount) * slippage / 100);
    set({ minimumReceived });
  },

  // Примерный метод: проверка готовности данных для ордера
  isOrderDataReady: () => {
    const { sendJetton, receiveJetton, sendAmount, receiveAmount, isPoolExist } = get();
    // Простая логика: все токены выбраны, есть пул, есть суммы
    return sendJetton && receiveJetton && sendAmount && receiveAmount && isPoolExist;
  },

  // Примерный метод: определить, заблокирована ли кнопка основного свопа
  isMainSwapButtonDisabled: () => {
    const { sendAmount, receiveAmount, isPoolExist } = get();
    // Если нет пулла или суммы не указаны — кнопка выключена
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

  // Примерный метод: Обновление расчитанных данных свопа (например, рефетч)
  handleUpdateSwapButtonClick: (estimateSwap) => {
    set({ isUpdateButtonIconRoating: true });
    estimateSwap().finally(() => {
      set({ isUpdateButtonIconRoating: false });
    });
  },

  // Примерный метод: Смена местами send/receive токенов
  handleSwap: () => {
    const { sendJetton, receiveJetton, sendAmount, receiveAmount } = get();

    if (receiveAmount !== '') {
      // Поменяем их местами
      set({
        sendJetton: receiveJetton,
        receiveJetton: sendJetton,
        sendAmount: receiveAmount,
        receiveAmount: sendAmount,
        isSwapButtonIconRoating: true
      });
      // Сбросим анимацию через какое-то время (реально — через useEffect или другую механику)
      setTimeout(() => {
        set({ isSwapButtonIconRoating: false });
      }, 200);
    }
  },
}));

export default useSwapStore;
