import { Dispatch, SetStateAction } from 'react';

type ToggleUnitsProps = {
  units: 'metric' | 'imperial';
  setUnits: Dispatch<SetStateAction<'metric' | 'imperial'>>;
};

const ToggleUnits = ({ units, setUnits }: ToggleUnitsProps) => {
  return (
    <button
      className="toggle-units-btn"
      onClick={() =>
        setUnits((prevUnits) =>
          prevUnits === 'metric' ? 'imperial' : 'metric'
        )
      }
    >
      {units === 'metric' ? '°C' : '°F'}
    </button>
  );
};

export default ToggleUnits;
