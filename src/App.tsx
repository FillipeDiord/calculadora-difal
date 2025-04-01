import { useState } from "react";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Button } from "./components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";

import { toast, ToastContainer } from "react-toastify";
import { formatCurrencyInput } from "./utils";

function App() {
  const [operationValue, setOperationValue] = useState<string>("");
  const [icmsTaxRateValue, setIcmsTaxRateValue] = useState(0);
  const [originProduct, setOriginProduct] = useState("");
  const [operationResult, setOperationResult] = useState<number | null>(null);

  function calculateIcmsTaxRate() {
    try {
      const value = parseFloat(
        operationValue.replace(/\./g, "").replace(",", ".")
      );

      if (isNaN(value) || value <= 0) {
        return toast.error("Coloque o valor da operação!");
      }

      if (originProduct === "nacional") {
        setOperationResult(parseFloat((0.0449 * value).toFixed(2)));
        setIcmsTaxRateValue(7);
        return;
      }

      if (originProduct === "importado") {
        setOperationResult(parseFloat((0.0787 * value).toFixed(2)));
        setIcmsTaxRateValue(4);
        return;
      }
    } catch (error) {
      console.error("Erro no cálculo de ICMS:", error);
      toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
    }
  }

  function showIcmsTaxRate(value: string | null = null) {
    if (!value) {
      return 0;
    }

    setIcmsTaxRateValue(value === "importado" ? 4 : 7);
    return;
  }

  return (
    <main className="absolute inset-0 flex h-screen flex-1 flex-col overflow-y-auto text-center">
      <header className="flex-0 shrink-0 bg-gray-100 p-4 font-bold text-2xl">
        Calculadora de DIFAL
      </header>
      <section className="flex items-center min-h-0 flex-1 flex-col justify-center space-y-4 overflow-y-auto">
        <div className="flex flex-col items-center md:items-start justify-center md:gap-8 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <Label>Valor da operação:</Label>
            <Input
              type="text"
              value={operationValue}
              className="w-80"
              onChange={(event) => {
                const formattedValue = formatCurrencyInput(event.target.value);
                setOperationValue(formattedValue);
              }}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Label>Origem do produto:</Label>
            <Select
              onValueChange={(value) => {
                setOriginProduct(value);
                showIcmsTaxRate(value);
                setOperationResult(0);
              }}
              defaultValue={originProduct}
            >
              <SelectTrigger className="select-trigger w-40">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nacional">Nacional</SelectItem>
                <SelectItem value="importado">Importado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-4 md:mb-6">
            <Label>Alíquota de ICMS:</Label>
            <Label className="text-orange-700">{icmsTaxRateValue}%</Label>
          </div>
        </div>
        <div>
          <Button
            variant="default"
            className="cursor-pointer mb-2"
            onClick={calculateIcmsTaxRate}
          >
            Calcular
          </Button>
        </div>
        <div>
          {operationResult !== null && operationResult !== 0 && (
            <Label className="text-2xl">
              Resultado da Operação:{" "}
              <span className="text-green-800">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(operationResult)}
              </span>
            </Label>
          )}
        </div>
      </section>
      <footer className="flex-0 shrink-0 bg-gray-100 p-4 mt-0">
        Desenvolvido por{" "}
        <a
          href="https://www.linkedin.com/in/fillipe-diord/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-800 font-bold hover:no-underline"
        >
          Fillipe Diord 🧑🏻💻
        </a>
        . Todos os direitos reservados &copy; {new Date().getFullYear()}.
      </footer>

      <ToastContainer />
    </main>
  );
}

export default App;
