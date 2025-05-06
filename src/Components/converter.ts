document.addEventListener("DOMContentLoaded", () => {
  // Validar que los elementos del DOM no sean null
  const temperatureInput = document.getElementById(
    "temperature"
  ) as HTMLInputElement | null;
  const fromUnit = document.getElementById(
    "fromUnit"
  ) as HTMLSelectElement | null;
  const toUnit = document.getElementById("toUnit") as HTMLSelectElement | null;
  const convertBtn = document.getElementById(
    "convertBtn"
  ) as HTMLButtonElement | null;
  const result = document.getElementById(
    "result"
  ) as HTMLParagraphElement | null;

  if (!temperatureInput || !fromUnit || !toUnit || !convertBtn || !result) {
    console.error(
      "Error: No se encontraron todos los elementos necesarios en el DOM."
    );
    throw new Error("Faltan elementos en el DOM.");
  }

  // Habilita el botón solo si todos los campos están completos
  function checkInputs() {
    if (!convertBtn) {
      console.error("Error: El botón de conversión no está disponible.");
      return;
    }

    if (temperatureInput?.value && fromUnit?.value && toUnit?.value) {
      convertBtn.disabled = false;
    } else {
      convertBtn.disabled = true;
    }
  }

  temperatureInput?.addEventListener("input", checkInputs);
  fromUnit?.addEventListener("change", checkInputs);
  toUnit?.addEventListener("change", checkInputs);

  convertBtn?.addEventListener("click", () => {
    const temp = parseFloat(temperatureInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    // Validar que el valor ingresado sea un número
    if (isNaN(temp)) {
      result.textContent = "Por favor, ingresa un número válido.";
      return;
    }

    if (from === to) {
      result.textContent = `${temp} ${from} es ${temp} ${to}`;
      return;
    }

    let celsius;

    // Convertir a Celsius primero
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

    let converted;

    // Luego de Celsius a la unidad objetivo
    switch (to) {
      case "Fahrenheit":
        converted = (celsius * 9) / 5 + 32;
        break;
      case "Kelvin":
        converted = celsius + 273.15;
        break;
      default:
        converted = celsius;
    }

    result.textContent = `${temp} ${from} es ${converted.toFixed(2)} ${to}`;
  });
});
