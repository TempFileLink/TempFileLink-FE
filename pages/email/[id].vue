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
            <label for="file-password" class="sr-only">File Password</label>
            <input
              id="file-password"
              v-model="file_password"
              name="file-password"
              type="file-password"
              required="true"
              class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 outline outline-1 -outline-offset-1 outline-indigo-900 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              placeholder="Enter file password"
            />
          </div>
          <div>
            <label for="sender-email" class="sr-only">Sender Email</label>
            <input
              id="sender-email"
              v-model="sender_email"
              name="sender-email"
              type="sender-email"
              required="true"
              class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 outline outline-1 -outline-offset-1 outline-indigo-900 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              placeholder="Enter sender email"
            />
          </div>
          <div>
            <label for="sender-password" class="sr-only">Sender Password</label>
            <input
              id="sender-password"
              v-model="sender_password"
              name="sender-password"
              type="sender-password"
              required="true"
              class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 outline outline-1 -outline-offset-1 outline-indigo-900 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              placeholder="Enter sender password"
            />
          </div>
          <div>
            <label for="receiver-email" class="sr-only">Receiver Email</label>
            <input
              id="receiver-email"
              v-model="receiver_email"
              name="receiver-email"
              type="receiver-email"
              required="true"
              class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 outline outline-1 -outline-offset-1 outline-indigo-900 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              placeholder="Enter receiver email"
            />
          </div>
          <div>
            <label for="message" class="sr-only">Message</label>
            <input
              id="message"
              v-model="message"
              name="message"
              type="message"
              required="true"
              class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 outline outline-1 -outline-offset-1 outline-indigo-900 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              placeholder="Enter message"
            />
          </div>
          <button
            type="submit"
            class="flex-none rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            @click="getLink"
          >
            Share File Link
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

const file_password = ref('');
const sender_email = ref('');
const sender_password = ref('');
const receiver_email = ref('');
const message = ref('');
const { id } = useRoute().params;
const config = useRuntimeConfig();

// pake file aja
const { data: file } = await useFetch<InfoFileResponse>(
  `${config.public.apiBase}/api/v1/file/info/${id}`,
);

async function getLink() {
  await useFetch(
    `${config.public.apiBase}/api/v1/file/get/${id}?password=${file_password.value}`,
    {
      onResponse({ response }) {
        if (response.ok) {
          // toast({
          //   title: response._data.value,
          // });
          sendEmail(response._data.value);
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
async function sendEmail(presigned_url: string) {
  const formData = new FormData();
  formData.append('presigned_url', presigned_url);
  formData.append('sender_email', sender_email.value);
  formData.append('sender_password', sender_password.value);
  formData.append('receiver_email', receiver_email.value);
  formData.append('message', message.value);
  await useFetch(`${config.public.apiBase}/api/v1/email/send`, {
    method: 'POST',
    body: formData,
    onResponse({ response }) {
      if (response.ok) {
        toast({
          title: 'Email has been sent!',
        });
        window.location.href = '/dashboard';
      }
    },
    onResponseError({ response }) {
      if (response.status == 400) {
        toast({
          title:
            'Failed to send email, please recheck your email and passwords.',
          variant: 'destructive',
        });
      }
    },
  });
}
</script>
