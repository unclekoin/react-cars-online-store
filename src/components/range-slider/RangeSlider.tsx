import React, {
  useCallback, useEffect, useState, useRef, FC,
} from 'react';
import { useFilterContext } from '../context/filterContext';

type Params = { min: number; max: number };

interface Props {
  name: string;
  title: string;
  min: number;
  max: number;
  onChange: (value: Params) => void;
}

const RangeSlider: FC<Props> = ({
  name, title, min, max, onChange,
}) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const range = useRef<HTMLDivElement | null>(null);

  const context = useFilterContext();

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('filters') || '{}');
    if (data[name]) {
      setMinVal(data[name].min);
      setMaxVal(data[name].max);
      minValRef.current = data[name].min;
      maxValRef.current = data[name].max;
    } else {
      setMinVal(min);
      setMaxVal(max);
      minValRef.current = min;
      maxValRef.current = max;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.reset]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minVal, maxVal]);

  return (
    <div className="range-slider">
      <h3 className="range-slider__title">{title}</h3>
      <div className="range-slider__wrapper">
        <input
          className="range-slider__thumb range-slider__thumb_left"
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          style={{ zIndex: minVal > max - 10 ? '5' : '3' }}
        />
        <input
          className="range-slider__thumb range-slider__thumb_right"
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
        />

        <div className="range-slider__slider">
          <div className="range-slider__track" />
          <div ref={range} className="range-slider__range" />
          <div className="range-slider__left-value">{minVal}</div>
          <div className="range-slider__right-value">{maxVal}</div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
