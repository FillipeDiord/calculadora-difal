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
  const [icmsTaxRateValue, setIcmsTaxRateValue] = useState("");
  const [operationResult, setOperationResult] = useState<number | null>(null);

  function calculateIcmsTaxRate() {
    try {
      const valorOperacao = Number(operationValue);
      const aliquotaICMS = Number(icmsTaxRateValue);

      if (isNaN(valorOperacao) || valorOperacao <= 0) {
        return toast.error("Coloque o valor da operação!");
      }

      if (isNaN(aliquotaICMS) || (aliquotaICMS !== 4 && aliquotaICMS !== 7)) {
        return toast.error("Escolha uma alíquota válida de ICMS!");
      }

      if (aliquotaICMS === 7) {
        setOperationResult(parseFloat((0.0449 * valorOperacao).toFixed(2)));
        return;
      }

      if (aliquotaICMS === 4) {
        setOperationResult(parseFloat((0.0787 * valorOperacao).toFixed(2)));
        return;
      }
    } catch (error) {
      console.error("Erro no cálculo de ICMS:", error);
      toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
    }
  }

  return (
    <>
      <h1>Calculadora de DIFAL</h1>

      <div className="flex mb-10">
        <Label>Qual é o valor da operação?</Label>
        <Input
          type="number"
          value={operationValue}
          onChange={(event) =>
            setOperationValue(
              event.target.value === "" ? "" : Number(event.target.value)
            )
          }
        />
      </div>

      <div className="flex gap-4 items-center mb-10">
        <Label>Qual é a alíquota de ICMS?</Label>
        <Select
          onValueChange={(value) => setIcmsTaxRateValue(value)}
          defaultValue={icmsTaxRateValue}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4%</SelectItem>
            <SelectItem value="7">7%</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="default"
        className="cursor-pointer mb-10"
        onClick={calculateIcmsTaxRate}
      >
        Calcular
      </Button>

      <div className="flex gap-1 items-center">
        {operationResult !== null && (
          <Label className="text-2xl">
            Resultado da Operação é de{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(operationResult)}
          </Label>
        )}
      </div>

      <ToastContainer />
    </>
  );
}

export default App;