#!/usr/bin/env bash
set -e
MODEL_DIR="./models"
MODEL_FILE="Llama-3-Mopeyfied-Psychology-v2.IQ3_M.gguf"
REPO_URL="https://huggingface.co/mradermacher/Llama-3-Mopeyfied-Psychology-v2-GGUF/resolve/main/${Llama-3-Mopeyfied-Psychology-v2.IQ3_M.gguf}"

mkdir -p "${MODEL_DIR}"
echo "⬇️  Descargando modelo ${MODEL_FILE} …"
curl -L -o "${MODEL_DIR}/${MODEL_FILE}" "${REPO_URL}"
echo "✅  Guardado en ${MODEL_DIR}/${MODEL_FILE}"

echo "🔧  Compilando llama‑cpp (node-llama-cpp) …"
npx --yes node-llama-cpp build
echo "🎉  Modelo y binarios listos."
