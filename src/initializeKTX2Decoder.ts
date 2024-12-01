// initializeKTX2Decoder.ts
import { KhronosTextureContainer2 } from "@babylonjs/core/Misc/khronosTextureContainer2";
import { AutoReleaseWorkerPool } from "@babylonjs/core/Misc/workerPool";
import { initializeWebWorker } from "@babylonjs/core/Misc/khronosTextureContainer2Worker";
import "@babylonjs/core/Materials/Textures/Loaders/ktxTextureLoader";

// Import the WASM transcoder as a URL
import wasmMSCTranscoderURL from "@babylonjs/ktx2decoder/wasm/msc_basis_transcoder.wasm?url";

// Define the type for the worker constructor
export type WorkerConstructor = new () => Worker;

export async function initializeKTX2Decoder(workerConstructor: WorkerConstructor) {
  // Fetch the WASM module as an ArrayBuffer
  const response = await fetch(wasmMSCTranscoderURL);
  const wasmMSCTranscoderArrayBuffer = await response.arrayBuffer();

  // Create a worker pool
  KhronosTextureContainer2.WorkerPool = new AutoReleaseWorkerPool(4, () => {
    // Create a new worker using the provided worker constructor
    const worker = new workerConstructor();

    // Initialize the worker with the WASM module
    return initializeWebWorker(worker, {
      wasmMSCTranscoder: wasmMSCTranscoderArrayBuffer,
    });
  });
}
