<template>
  <div>
    <div v-if="files !== null">
      <div v-if="files.data !== null">
        <ul role="list" class="divide-y divide-gray-100 px-10">
          <li
            v-for="file of files.data"
            :key="file.fileId"
            class="flex justify-between gap-x-6 py-5"
          >
            <div class="flex min-w-0 gap-x-4">
              <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold text-gray-900">
                  {{ file.name }}
                </p>
                <p class="mt-1 truncate text-xs/5 text-gray-500">
                  {{ file.fileId }}
                </p>
              </div>
            </div>
            <div class="gap-3 md:flex">
              <NuxtLink
                :to="{ name: 'file-id', params: { id: file.fileId } }"
                target="_blank"
              >
                <Button
                  class="rounded bg-green-500 px-4 py-1 font-bold text-white hover:bg-green-700"
                  >Download</Button
                >
              </NuxtLink>

              <NuxtLink
                :to="{ name: 'email-id', params: { id: file.fileId } }"
                target="_blank"
              >
                <Button
                  class="rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
                  >Share</Button
                >
              </NuxtLink>

              <Button
                class="rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700"
                @click="() => deleteFile(file.fileId)"
                >Delete</Button
              >
            </div>
          </li>
        </ul>
      </div>

      <div
        v-else
        class="relative isolate flex items-center justify-center py-16 sm:py-24 lg:py-32"
      >
        <h2 class="text-4xl font-semibold tracking-tight">
          You doesn't have uploaded file
        </h2>
      </div>
    </div>

    <div
      v-else
      class="relative isolate flex items-center justify-center py-16 sm:py-24 lg:py-32"
    >
      <h2 class="text-4xl font-semibold tracking-tight">
        You doesn't have uploaded file
      </h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toast } from '@/components/ui/toast';
import type { ListFilesResponse } from '~/types/apiResponse';

reloadNuxtApp();
const config = useRuntimeConfig();

const headers = useRequestHeaders(['cookie']);
const { data: files } = await useFetch<ListFilesResponse>(
  `${config.public.apiBase}/api/v1/file/all`,
  {
    onRequest({ options }) {
      options.headers.set(
        'Authorization',
        `Bearer ${headers.cookie?.split('=')[1]}`,
      );
    },
  },
);

async function deleteFile(fileId: string) {
  const { token } = useAuth();

  await useFetch(`${config.public.apiBase}/api/v1/file/delete/${fileId}`, {
    method: 'DELETE',
    onRequest({ options }) {
      options.headers.set('Authorization', `${token.value}`);
    },
    onResponse({ response }) {
      // Process the response data
      if (response.ok) {
        toast({
          title: `You have successfully delete file ${fileId}!`,
        });

        window.location.href = '/dashboard';
      }
    },
    onResponseError() {
      // Handle the response errors
      toast({
        title: `An error occurred when deleting file ${fileId}. Please try again later.`,
        variant: 'destructive',
      });
    },
  });
}
</script>
