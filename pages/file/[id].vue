<template>
  <div class="relative isolate py-16 sm:py-24 lg:py-32">
    <div class="flex items-center justify-center">
      <div v-if="file !== null" class="text-center">
        <h2 class="text-4xl font-semibold tracking-tight">
          {{ file.filename }}
        </h2>
        <p class="mt-4 text-lg text-gray-900">{{ file.contentSize }} Bytes</p>

        <div class="mt-10 flex items-center justify-center gap-x-6">
          <div v-if="file.isPassword">
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="value"
              name="password"
              type="password"
              required="true"
              class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 outline outline-1 -outline-offset-1 outline-indigo-900 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            class="flex-none rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            @click="downloadFile"
          >
            Download
          </button>
        </div>
      </div>

      <div v-else class="text-center">
        <h2 class="text-4xl font-semibold tracking-tight">
          Your File is not invalid
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from '@/components/ui/toast';
import type { InfoFileResponse } from '~/types/apiResponse';

// No authentication needed
definePageMeta({
  auth: false,
});

const value = ref('');
const { id } = useRoute().params;
const config = useRuntimeConfig();

// pake file aja
const { data: file } = await useFetch<InfoFileResponse>(
  `${config.public.apiBase}/api/v1/file/info/${id}`,
);

async function downloadFile() {
  await useFetch(
    `${config.public.apiBase}/api/v1/file/get/${id}?password=${value.value}`,
    {
      onResponse({ response }) {
        // Process the response data
        if (response.ok) {
          window.location.href = response._data.value;
        }
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          toast({
            title: 'Your password is incorrect',
            variant: 'destructive',
          });
        } else {
          toast({
            title:
              'An error occurred while generating download link. Please try again later.',
            variant: 'destructive',
          });
        }
      },
    },
  );
}
</script>
