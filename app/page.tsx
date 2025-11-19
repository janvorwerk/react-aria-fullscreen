"use client";

import { useState } from "react";
import { Button, Input, Label, TextField } from "react-aria-components";

export default function Home() {
  const [name, setName] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <main className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-800">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">React Aria Demo</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            A simple example showcasing React Aria components with Next.js and Tailwind CSS
          </p>
        </div>

        <div className="space-y-6">
          <TextField value={name} onChange={setName} className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</Label>
            <Input
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50 dark:focus:border-blue-400"
              placeholder="Enter your name"
            />
          </TextField>

          <div className="flex flex-col gap-3">
            <Button
              onPress={() => alert(`Hello, ${name || "there"}!`)}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 pressed:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-zinc-400 dark:focus:ring-offset-zinc-800"
            >
              Say Hello
            </Button>

            <Button
              isDisabled={!name}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 font-medium text-zinc-700 transition-colors hover:bg-zinc-50 pressed:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600 dark:focus:ring-zinc-400"
            >
              Disabled Button
            </Button>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              You entered: <strong>{name}</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
