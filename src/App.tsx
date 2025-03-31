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
import "./App.css";

function App() {
  const [operationValue, setOperationValue] = useState<string | number>("");
  const [icmsTaxRateValue, setIcmsTaxRateValue] = useState(0);
  const [originProduct, setOriginProduct] = useState("");
  const [operationResult, setOperationResult] = useState<number | null>(null);

  function calculateIcmsTaxRate() {
    try {
      const value = Number(operationValue);

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
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center mb-8">
        <Label className="text-4xl">Calculadora de DIFAL</Label>
      </div>

      <div className="flex flex-col items-center w-160 mb-8 gap-8">
        <div className="flex items-center w-full gap-6">
          <Label>Valor da operação:</Label>
          <Input
            type="number"
            value={operationValue}
            className="w-80 text-2xl"
            onChange={(event) =>
              setOperationValue(
                event.target.value === "" ? "" : Number(event.target.value)
              )
            }
          />
        </div>

        <div className="flex items-center w-full gap-6">
          <Label>Origem do produto:</Label>
          <Select
            onValueChange={(value) => {
              setOriginProduct(value);
              showIcmsTaxRate(value);
              setOperationResult(0);
            }}
            defaultValue={originProduct}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nacional">Nacional</SelectItem>
              <SelectItem value="importado">Importado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center w-full gap-10 mb-6">
          <Label>Alíquota de ICMS:</Label>
          <Label className="text-orange-700">{icmsTaxRateValue}%</Label>
        </div>
      </div>

      <Button
        variant="default"
        className="cursor-pointer mb-10"
        onClick={calculateIcmsTaxRate}
      >
        Calcular
      </Button>

      <div className="flex gap-1 items-center">
        {operationResult !== null && operationResult !== 0 && (
          <Label className="text-2xl">
            Resultado da Operação é de:{" "}
            <span className="text-green-800">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(operationResult)}
            </span>
          </Label>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
