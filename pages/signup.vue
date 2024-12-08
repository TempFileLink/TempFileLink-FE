<template>
  <div class="flex flex-1">
    <div
      class="flex flex-[2_1_0%] flex-col items-center justify-center p-6 shadow-lg"
    >
      <form class="flex w-full flex-col gap-8" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-4">
          <FormField v-slot="{ componentField }" name="email">
            <h1 class="text-center text-4xl font-bold md:text-left md:text-5xl">
              Sign Up Now!
            </h1>
            <p
              class="text-center text-base text-gray-500 md:text-left md:text-lg"
            >
              Sign up to take full control of your temporary files. Track
              uploads, extend expiration times, and delete files early.
            </p>
            <FormItem>
              <FormLabel class="text-base">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="TempFile@mail.com"
                  v-bind="componentField"
                  :disabled="form.isSubmitting.value"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel class="text-base">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Min 6 characters"
                  v-bind="componentField"
                  :disabled="form.isSubmitting.value"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="flex flex-col items-center gap-2 text-center">
          <Button
            type="submit"
            class="w-40 bg-primary text-base text-white hover:bg-primary-hover md:text-lg"
            :disabled="form.isSubmitting.value"
          >
            Sign Up
          </Button>
          <p>
            Already have an account?
            <NuxtLink
              href="/login"
              class="text-primary hover:text-primary-hover"
              >Log in with your account</NuxtLink
            >
          </p>
        </div>
      </form>
    </div>
    <div
      class="hidden flex-[3_1_0%] bg-[url('/gradient.svg')] bg-cover md:block"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from '@/components/ui/toast';
import * as z from 'zod';
import type { ApiResponse, RegisterResponse } from '~/types/apiResponse';
import { isErrorResponse } from '~/types/utils';

definePageMeta({
  middleware: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard',
  },
});

const config = useRuntimeConfig();

const userSchema = toTypedSchema(
  z.object({
    email: z.string().email().min(1),
    password: z
      .string()
      .min(6, { message: 'Password must contain at least 6 character(s)' }),
  }),
);

const form = useForm({
  validationSchema: userSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const res = await $fetch<ApiResponse<RegisterResponse>>(
      `${config.public.apiBase}/api/v1/user/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: values,
        ignoreResponseError: true,
      },
    );

    if (isErrorResponse(res)) {
      toast({
        title: res.message,
        variant: 'destructive',
      });

      return;
    }

    toast({
      title: 'You have successfully signed up!',
    });

    await navigateTo('/login');
  } catch {
    toast({
      title: 'An error occurred while signing up. Please try again later.',
      variant: 'destructive',
    });
  }
});
</script>
