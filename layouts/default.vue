<template>
  <Toaster />
  <div class="flex min-h-screen flex-col">
    <header
      class="grid grid-cols-[repeat(3,minmax(max-content,1fr))] items-center gap-2 border border-b-slate-300 px-6 py-4 md:gap-4"
    >
      <div class="justify-self-start">
        <NuxtLink href="/" class="flex items-center gap-2 justify-self-start">
          <NuxtImg src="/logo.svg" width="48" height="48" />
          <div class="hidden text-xl font-bold text-primary sm:block">
            TempFile.Link
          </div>
        </NuxtLink>
      </div>
      <div class="justify-self-center">
        <NuxtLink to="/upload">
          <Button
            class="bg-primary text-base text-white hover:bg-primary-hover md:text-lg"
          >
            <Icon name="solar:upload-minimalistic-bold" />
            Upload
          </Button>
        </NuxtLink>
      </div>
      <div v-if="status === 'unauthenticated'" class="justify-self-end">
        <NuxtLink to="/login">
          <Button class="text-base md:text-lg" variant="ghost">Log in</Button>
        </NuxtLink>
      </div>
      <div v-else class="justify-self-end">
        <div class="hidden gap-4 md:flex">
          <NuxtLink to="/dashboard">
            <Button class="text-base md:text-lg" variant="ghost"
              >Dashboard</Button
            >
          </NuxtLink>
          <Button
            class="text-base md:text-lg"
            variant="destructive"
            @click="() => signOut({ callbackUrl: '/' })"
            >Log out</Button
          >
        </div>
        <div class="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost">
                <Icon name="prime:align-justify" size="32" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <NuxtLink to="/dashboard">
                  <Button class="text-base md:text-lg" variant="ghost"
                    >Dashboard</Button
                  >
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  class="text-base text-red-500 md:text-lg"
                  variant="ghost"
                  @click="() => signOut({ callbackUrl: '/' })"
                  >Log out</Button
                ></DropdownMenuItem
              >
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
    <slot />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'TempFile.Link',
  meta: [
    {
      name: 'description',
      content: 'Upload Temp File, Get Link, and Share',
    },
  ],
});

useSeoMeta({
  ogTitle: 'TempFile.Link',
  ogDescription: 'Upload Temp File, Get Link, and Share',
  ogImage: '/logo.svg',
});

const { status, signOut } = useAuth();
</script>
