import { useState, useEffect } from "react";

const Home = () => {
  const [temperature, setTemperature] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState("");
  const [canConvert, setCanConvert] = useState(false);

  useEffect(() => {
    setCanConvert(
      temperature.trim() !== "" &&
        fromUnit.trim() !== "" &&
        toUnit.trim() !== ""
    );
  }, [temperature, fromUnit, toUnit]);

  const convertTemperature = (
    temp: number,
    from: string,
    to: string
  ): number => {
    let celsius: number;

    switch (from) {
      case "Fahrenheit":
        celsius = ((temp - 32) * 5) / 9;
        break;
      case "Kelvin":
        celsius = temp - 273.15;
        break;
      default:
        celsius = temp;
    }

    switch (to) {
      case "Fahrenheit":
        return (celsius * 9) / 5 + 32;
      case "Kelvin":
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const handleConvert = () => {
    const temp = parseFloat(temperature);
    if (isNaN(temp)) {
      setResult("Please enter a valid number.");
      return;
    }

    if (fromUnit === toUnit) {
      setResult(`${temp} ${fromUnit} es ${temp} ${toUnit}`);
      return;
    }

    const converted = convertTemperature(temp, fromUnit, toUnit);
    setResult(`${temp} ${fromUnit} is ${converted.toFixed(2)} ${toUnit}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Temperature Converter
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter the temperature, select the units and convert.
        </p>

        <input
          type="number"
          placeholder="0.00"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">From unit</option>
          <option value="Celsius">Celsius</option>
          <option value="Fahrenheit">Fahrenheit</option>
          <option value="Kelvin">Kelvin</option>
        </select>

        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">To unit</option>
          <option value="Celsius">Celsius</option>
          <option value="Fahrenheit">Fahrenheit</option>
          <option value="Kelvin">Kelvin</option>
        </select>

        <button
          onClick={handleConvert}
          disabled={!canConvert}
          className={`w-full py-2 rounded-md transition duration-200 ${
            canConvert
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Convert
        </button>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Result</h3>
          <p className="text-2xl font-bold text-blue-500">{result}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
