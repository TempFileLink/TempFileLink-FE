<template>
  <section class="min-h-screen bg-[url('/gradient.svg')] bg-cover">
    <div class="container mx-auto py-8">
      <div
        class="mx-auto max-w-2xl rounded-lg border bg-white/90 p-8 shadow-lg backdrop-blur-sm"
      >
        <div class="mb-8 text-center">
          <h1 class="mb-2 text-3xl font-bold text-primary md:text-4xl">
            Upload Your File
          </h1>
          <p class="text-gray-600">
            Share files securely with optional password protection
          </p>
        </div>

        <form @submit.prevent="handleUpload" class="space-y-6">
          <!-- Drop Zone -->
          <FormField v-slot="{ componentField }" name="file">
            <FormItem>
              <FormLabel class="text-base font-medium text-gray-700"
                >Select File</FormLabel
              >
              <FormControl>
                <div class="relative">
                  <Input
                    type="file"
                    v-bind="componentField"
                    @change="handleFileChange"
                    :disabled="isUploading"
                    class="cursor-pointer file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-1 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-hover"
                  />
                  <p v-if="selectedFile" class="mt-2 text-sm text-gray-600">
                    Selected: {{ selectedFile.name }}
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Password Input with Icon -->
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel class="text-base font-medium text-gray-700">
                Password Protection (Optional)
              </FormLabel>
              <FormControl>
                <div class="relative">
                  <Input
                    type="password"
                    placeholder="Set a password to protect your file"
                    v-bind="componentField"
                    :disabled="isUploading"
                    class="pl-10"
                  />
                  <Icon
                    name="heroicons:lock-closed"
                    class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </FormControl>
              <FormDescription class="text-xs text-gray-500">
                If set, users will need this password to download the file
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Submit Button -->
          <Button
            type="submit"
            class="w-full bg-primary text-base font-semibold text-white transition-all hover:bg-primary-hover disabled:opacity-50 md:text-lg"
            :disabled="isUploading || !selectedFile"
            :data-debug-is-uploading="isUploading"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon
                v-if="isUploading"
                name="heroicons:arrow-path"
                class="h-5 w-5 animate-spin"
              />
              {{ isUploading ? 'Uploading...' : 'Upload File' }}
            </div>
          </Button>
        </form>

        <!-- Success Info -->
        <div
          v-if="uploadedFileId"
          class="mt-6 rounded-lg border border-green-100 bg-green-50 p-4"
        >
          <div class="flex items-center gap-2">
            <Icon
              name="heroicons:check-circle"
              class="h-5 w-5 text-green-500"
            />
            <h2 class="text-lg font-semibold text-green-800">
              File Uploaded Successfully!
            </h2>
          </div>
          <div class="mt-2 pl-7">
            <p class="mb-2 font-mono text-sm text-gray-600">
              File ID: {{ uploadedFileId }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from '@/components/ui/toast';
import * as z from 'zod';
import type { ApiResponse, UploadResponse } from '~/types/apiResponse';
import { isErrorResponse } from '~/types/utils';

definePageMeta({
  middleware: ['auth'],
});

const config = useRuntimeConfig();
const session = useAuth();

const selectedFile = ref<File | null>(null);
const uploadedFileId = ref<string | null>(null);

const uploadSchema = toTypedSchema(
  z.object({
    file: z.any(),
    password: z.string().optional(),
  }),
);

const form = useForm({
  validationSchema: uploadSchema,
});

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
    uploadedFileId.value = null;
  }
};

const isUploading = ref(false);

const handleUpload = form.handleSubmit(async (values) => {
  if (!selectedFile.value) {
    toast({
      title: 'Please select a file to upload',
      variant: 'destructive',
    });
    return;
  }

  isUploading.value = true;

  try {
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    if (values.password) {
      formData.append('password', values.password);
    }

    // Get clean token
    const token = session.token.value?.split(' ').pop() || '';

    const res = await $fetch<ApiResponse<UploadResponse>>(
      `${config.public.apiBase}/api/v1/file/upload`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ignoreResponseError: true,
      },
    );

    if (isErrorResponse(res)) {
      toast({
        title: res.message,
        variant: 'destructive',
      });
      isUploading.value = false;
      return;
    }

    uploadedFileId.value = res.fileId;

    toast({
      title: res.message,
    });

    // Reset form safely
    form.resetForm({
      values: {
        password: '',
      },
    });

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    form.resetForm();
    selectedFile.value = null;
  } catch {
    toast({
      title: 'An error occurred while uploading. Please try again later.',
      variant: 'destructive',
    });
  } finally {
    form.resetForm();
    isUploading.value = false;
  }
});
</script>
