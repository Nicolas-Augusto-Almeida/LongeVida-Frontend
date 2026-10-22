import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { mensagemDeErro } from "../screens/services/api";

export function useApiQuery<T>(buscar: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const buscarRef = useRef(buscar);
  buscarRef.current = buscar;
  const temDados = useRef(false);

  const recarregar = useCallback(async () => {
    if (!temDados.current) setLoading(true);
    setError(null);
    try {
      const resultado = await buscarRef.current();
      setData(resultado);
      temDados.current = true;
    } catch (e) {
      if (!temDados.current) setError(mensagemDeErro(e));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useFocusEffect(
    useCallback(() => {
      recarregar();
    }, [recarregar]),
  );

  return { data, loading, error, recarregar, setData };
}
