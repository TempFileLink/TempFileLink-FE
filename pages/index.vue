<template>
  <main class="overflow-hidden">
    <section class="bg-[url('/gradient.svg')] bg-cover px-6 py-4">
      <div
        v-motion-slide-top
        class="flex min-h-[90vh] flex-col items-center justify-center gap-4"
      >
        <div class="flex flex-col items-center justify-center gap-2">
          <h1 class="text-center text-4xl font-bold text-primary md:text-5xl">
            Upload Temp File, Get Link, and Share
          </h1>
          <p
            class="text-center text-base font-semibold text-primary-dark md:max-w-[50vw] md:text-lg"
          >
            Upload your temporary files with ease and receive a unique link
            instantly. Share the link with others to provide quick access
            without the need for lengthy setup or registrations.
          </p>
        </div>
        <p
          class="flex items-center gap-2 before:w-32 before:border-b before:border-b-slate-400 before:content-[''] after:w-32 after:border-b after:border-b-slate-400 after:content-['']"
        >
          <span class="uppercase text-slate-500">or</span>
        </p>
        <p
          class="flex flex-col gap-2 text-center text-primary-dark md:max-w-[50vw]"
        >
          Sign up to take full control of your temporary files.
          <NuxtLink to="/signup">
            <Button class="text-base md:text-lg" variant="outline"
              >Sign Up</Button
            >
          </NuxtLink>
        </p>
      </div>
    </section>
    <div
      class="flex flex-col gap-4 bg-[linear-gradient(90deg,#004aad,#04075c)] px-6 py-4 text-white"
    >
      <section
        v-motion-slide-visible-once-left
        class="flex min-h-80 items-center justify-center gap-8 md:h-96 md:gap-16"
      >
        <div class="flex max-w-[400px] flex-col gap-2">
          <h2 class="text-2xl font-bold md:text-4xl">
            Effortless File Upload, Instant Link, and Easy Sharing
          </h2>
          <p class="text-base md:text-lg">
            Quickly upload your temporary files and get a unique link in
            seconds. Share the link to grant fast access without any complicated
            setup or registration.
          </p>
        </div>
        <div class="max-h-80 max-w-80">
          <NuxtImg src="/upload.svg" />
        </div>
      </section>
      <section
        v-motion-slide-visible-once-right
        class="flex min-h-80 items-center justify-center gap-8 md:h-96 md:gap-16"
      >
        <div class="max-h-80 max-w-80">
          <NuxtImg src="/auth.svg" />
        </div>
        <div class="flex max-w-[400px] flex-col gap-2">
          <h2 class="text-2xl font-bold md:text-4xl">
            Manage Temp Files as Authenticated Users
          </h2>
          <p class="text-base md:text-lg">
            Log in to take full control of your temporary files. Track uploads,
            extend expiration times, and delete files early.
          </p>
        </div>
      </section>
      <section
        v-motion-slide-visible-once-left
        class="flex min-h-80 items-center justify-center gap-8 md:h-96 md:gap-16"
      >
        <div class="flex max-w-[400px] flex-col gap-2">
          <h2 class="text-2xl font-bold md:text-4xl">
            Protect Temp Files with Password
          </h2>
          <p class="text-base md:text-lg">
            Add an extra layer of security by setting a password for your
            temporary files. Only users with the password can access the shared
            link, keeping your sensitive data safe.
          </p>
        </div>
        <div class="max-h-80 max-w-80">
          <NuxtImg src="/password.svg" />
        </div>
      </section>
    </div>
  </main>
  <footer class="flex items-center justify-center px-6 py-4">
    <p class="text-center text-sm text-slate-500">
      &copy; 2024 TempFile.Link. All rights reserved.
    </p>
  </footer>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: false,
});
</script>
