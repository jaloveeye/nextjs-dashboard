"use client";

import { createCustomer } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "../button";

const faceImages = [
  "/customers/face01.png",
  "/customers/face02.png",
  "/customers/face03.png",
  "/customers/face04.png",
  "/customers/face05.png",
  "/customers/face06.png",
  "/customers/face07.png",
  "/customers/face08.png",
  "/customers/face09.png",
];

export default function Form() {
  const initialState = { message: null, errors: {} };

  const [selectedFace, setSelectedFace] = useState<string>(faceImages[0]);
  const [state, dispatch] = useFormState(createCustomer, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="face" className="mb-2 block text-sm font-medium">
            Choose Face Image
          </label>
        </div>

        <div className="relative flex items-center">
          <div className="w-[32px] mr-2">
            <Image
              src={selectedFace}
              className="rounded-full"
              alt={`profile picture`}
              width={28}
              height={28}
            />
          </div>

          <div className="flex-1">
            <select
              id="image_url"
              name="image_url"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="image_url-error"
              value={selectedFace}
              onChange={(e) => {
                setSelectedFace(e.target.value);
              }}
            >
              <option value="" disabled>
                Select a face Image
              </option>
              {faceImages.map((face, index: number) => (
                <option key={face} value={face}>
                  {`face ${index + 1}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
            {state.errors?.name ? (
              <div
                id="name-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.name.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                placeholder="Enter email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
            </div>
            {state.errors?.email ? (
              <div
                id="email-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.email.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
