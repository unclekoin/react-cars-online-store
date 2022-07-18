import React, {
  FC,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';
import carsServices from '../../mock-api/cars.services';
import { CartData } from '../../models/cart.model';
import { RangeSliderInterface } from '../../models/range.model';
import { Car } from '../../models/car.model';
import { SortType } from '../../models/sort.model';

interface FilterContextInterface {
  cart: CartData;
  setCart: (value: CartData) => void;
  search: string;
  setSearch: (value: string) => void;
  colors: string[];
  activeColors: string[];
  setActiveColors: (value: string[]) => void;
  doors: number[];
  setDoors: (value: number[]) => void;
  activeDoors: number[];
  setActiveDoors: (value: number[]) => void;
  brands: string[];
  activeBrands: string[];
  setActiveBrands: (value: string[]) => void;
  filteredData: Car[];
  rating: boolean;
  setRating: (value: boolean) => void;
  sort: SortType;
  setSort: (value: SortType) => void;
  reset: boolean;
  setReset: (value: boolean) => void;
  years: RangeSliderInterface;
  setYears: (value: RangeSliderInterface) => void;
  available: RangeSliderInterface;
  setAvailable: (value: RangeSliderInterface) => void;
}

const FilterContext = createContext<FilterContextInterface | null>(null);

export const useFilterContext = (): FilterContextInterface | null => useContext(FilterContext);

interface Props {
  children: ReactNode;
}

const FilterProvider: FC<Props> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [cart, setCart] = useState<CartData>({});
  const [search, setSearch] = useState<string>('');
  const [colors, setColors] = useState<string[] | []>([]);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [doors, setDoors] = useState<number[]>([]);
  const [activeDoors, setActiveDoors] = useState<number[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [rating, setRating] = useState<boolean>(false);
  const [sort, setSort] = useState<SortType>({ type: 'name', order: 'asc' });
  const [years, setYears] = useState<RangeSliderInterface>({ min: 2000, max: 2022 });
  const [available, setAvailable] = useState<RangeSliderInterface>({ min: 0, max: 30 });
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('filters') || '{}');

    const fetchData = async (): Promise<void> => {
      try {
        const data = await carsServices.fetchAll();
        setCars(data);
        const dataColor: string[] = [...new Set(cars.map((car) => car.color))];
        const dataDoors: number[] = [...new Set(cars.map((car) => car.doors))];
        const dataBrands: string[] = [...new Set(cars.map((car) => car.brand))];

        setColors(dataColor);
        setDoors(dataDoors);
        setBrands(dataBrands);
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(cartData);

    setActiveColors(storageData.colors || []);
    setActiveDoors(storageData.doors || []);
    setActiveBrands(storageData.brands || []);
    setRating(storageData.rating || false);

    const sortData: SortType = JSON.parse(localStorage.getItem('sort') || '{}');
    if (Object.keys(sortData).length) {
      setSort(sortData);
    } else {
      setSort({ type: 'name', order: 'asc' });
    }

    fetchData();
  }, [cars]);

  const searchedData: Car[] = search
    ? cars.filter((car) => car.name.toLowerCase().includes(search.toLowerCase()))
    : cars;

  const colorFilteredData: Car[] = activeColors?.length
    ? searchedData.filter((car) => activeColors.includes(car.color))
    : searchedData;

  const doorsFilteredData: Car[] = activeDoors?.length
    ? colorFilteredData.filter((car) => activeDoors.includes(car.doors))
    : colorFilteredData;

  const brandsFilter: Car[] = activeBrands.length
    ? doorsFilteredData.filter((car) => activeBrands.includes(car.brand))
    : doorsFilteredData;

  const filteredData: Car[] = rating ? brandsFilter.filter((car) => car.rating > 4) : brandsFilter;

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context: FilterContextInterface = {
    cart,
    setCart,
    search,
    setSearch,
    colors,
    activeColors,
    setActiveColors,
    doors,
    setDoors,
    activeDoors,
    setActiveDoors,
    brands,
    activeBrands,
    setActiveBrands,
    rating,
    setRating,
    sort,
    setSort,
    years,
    setYears,
    available,
    setAvailable,
    reset,
    setReset,
    filteredData,
  };

  return (
    <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
