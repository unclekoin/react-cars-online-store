import React, {
  FC,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';
import { CartData } from '../../models/cart.model';

interface MainContextInterface {
  count: number;
  setCount: (value: number) => void;
  increase: (value: number | undefined) => void;
  decrease: () => void;
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  changeCartCount: () => void;
  setPopupText: (value: string) => void;
  popupText: string;
  setCartCount: (value: number) => void;
  selectedList: string[];
  setSelectedList: (value: string[]) => void;
}

const MainContext = createContext<MainContextInterface | null>(null);

export const useMainContext = (): MainContextInterface | null => useContext(MainContext);

interface Props {
  children: ReactNode;
}

const MainProvider: FC<Props> = ({ children }) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [isPopup, setPopup] = useState<boolean>(false);
  const [popupText, setPopupText] = useState<string>('');
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const changeCartCount = (): void => {
    const data: CartData = JSON.parse(localStorage.getItem('cart') || '{}');
    const count: number | undefined = Object.values(data)
      .map((item) => item[0])
      .reduce((sum: number, item: number) => sum + item, 0);

    setCartCount(count);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('selected') || '[]');
    setSelectedList(data);
    changeCartCount();
  }, []);

  const increaseCartCount = (count: number | undefined): void => {
    if (count) {
      setCartCount(cartCount + count);
    } else {
      setCartCount(cartCount + 1);
    }
  };

  const decreaseCartCount = (): void => {
    if (cartCount > 0) setCartCount(cartCount - 1);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context: MainContextInterface = {
    count: cartCount,
    setCount: setCartCount,
    increase: increaseCartCount,
    decrease: decreaseCartCount,
    isPopup,
    setPopup,
    popupText,
    setPopupText,
    changeCartCount,
    setCartCount,
    selectedList,
    setSelectedList,
  };

  return (
    <MainContext.Provider value={context}>{children}</MainContext.Provider>
  );
};

export default MainProvider;
