<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse">
        <!-- Breadcrumb skeleton -->
        <div class="flex items-center space-x-2 mb-8">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <!-- Hero image skeleton -->
            <div
              class="h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8"
            ></div>

            <!-- Content skeleton -->
            <div class="space-y-6">
              <div class="flex flex-wrap gap-2">
                <div
                  class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"
                ></div>
                <div
                  class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"
                ></div>
                <div
                  class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"
                ></div>
              </div>

              <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div
                class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
              ></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>

              <!-- Cards skeleton -->
              <div class="space-y-4">
                <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          </div>

          <!-- Sidebar skeleton -->
          <div class="space-y-6">
            <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
            <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
            <div class="h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Training Content -->
    <div
      v-else-if="training"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <!-- Modern Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-3"
        >
          <ol class="flex items-center space-x-2">
            <li>
              <RouterLink
                to="/"
                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 flex items-center"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Accueil
              </RouterLink>
            </li>
            <li>
              <svg
                class="w-4 h-4 text-gray-400 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </li>
            <li>
              <RouterLink
                to="/catalogue"
                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                Catalogue
              </RouterLink>
            </li>
            <li>
              <svg
                class="w-4 h-4 text-gray-400 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </li>
            <li>
              <span
                class="text-gray-900 dark:text-gray-100 font-medium truncate max-w-xs"
              >
                {{ training.title }}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Hero Section -->
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              :src="training.image"
              :alt="training.title"
              class="w-full h-64 md:h-80 object-cover"
            />
            <!-- Overlay with badges -->
            <div class="absolute top-4 left-4 flex flex-wrap gap-2">
              <BaseBadge
                :variant="getDifficultyVariant(training.difficulty)"
                class="shadow-lg"
              >
                {{ getDifficultyLabel(training.difficulty) }}
              </BaseBadge>
              <BaseBadge variant="info" class="shadow-lg">{{
                training.format
              }}</BaseBadge>
              <BaseBadge
                v-if="training.featured"
                variant="warning"
                class="shadow-lg"
              >
                <template #icon>
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </template>
                À la une
              </BaseBadge>
            </div>
          </div>

          <!-- Training Info Card -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div class="mb-6">
              <h1
                class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
              >
                {{ training.title }}
              </h1>

              <p
                class="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
              >
                {{ training.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <BaseBadge
                  v-for="tag in training.tags"
                  :key="tag"
                  size="sm"
                  variant="secondary"
                >
                  {{ tag }}
                </BaseBadge>
              </div>

              <!-- Key Info Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div
                    class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-2"
                  >
                    <svg
                      class="w-6 h-6 text-gray-600 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ training.duration }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Durée
                  </div>
                </div>

                <div
                  class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div
                    class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-2"
                  >
                    <svg
                      class="w-6 h-6 text-gray-600 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ training.studentsCount }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Étudiants
                  </div>
                </div>

                <div
                  class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div
                    class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-2"
                  >
                    <svg
                      class="w-6 h-6 text-gray-600 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <div
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ training.rating }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Note
                  </div>
                </div>

                <div
                  class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div
                    class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-2"
                  >
                    <svg
                      class="w-6 h-6 text-gray-600 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <div
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{
                      training.price === 0
                        ? "Gratuit"
                        : training.price.toLocaleString() + " FCFA"
                    }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Prix
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Lessons -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div
              class="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-xl flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-lg font-bold text-gray-900 dark:text-gray-100"
                  >
                    Programme de la formation
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ training.lessons.length }} leçons
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6">
              <div class="space-y-3">
                <div
                  v-for="(lesson, index) in training.lessons"
                  :key="lesson.id"
                  class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 group"
                >
                  <div class="flex items-center space-x-4">
                    <div
                      class="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm"
                    >
                      <span
                        class="text-sm font-bold text-gray-600 dark:text-gray-400"
                        >{{ index + 1 }}</span
                      >
                    </div>
                    <div class="flex-1">
                      <h4
                        class="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      >
                        {{ lesson.title }}
                      </h4>
                      <div class="flex items-center space-x-3 mt-1">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          {{ lesson.duration }}
                        </p>
                        <BaseBadge size="sm" variant="info">{{
                          lesson.type
                        }}</BaseBadge>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button
                      v-if="lesson.downloadable"
                      class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                      title="Télécharger"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </button>
                    <button
                      class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Resources -->
          <BaseCard v-if="training.resources && training.resources.length > 0">
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Ressources complémentaires
              </h3>
            </template>

            <div class="space-y-3">
              <div
                v-for="resource in training.resources"
                :key="resource.id"
                class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div class="flex items-center">
                  <svg
                    class="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
                    />
                  </svg>
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-gray-100">
                      {{ resource.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ resource.size }}
                    </p>
                  </div>
                </div>
                <button
                  class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- CTA Card -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div
              class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-center"
            >
              <div class="text-3xl font-bold text-white mb-2">
                {{
                  training.price === 0
                    ? "Gratuit"
                    : training.price.toLocaleString() + " FCFA"
                }}
              </div>
              <p class="text-gray-200 mb-6">Formation certifiante</p>

              <div class="flex items-center justify-center space-x-2 mb-6">
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="text-white font-medium">{{
                    training.rating
                  }}</span>
                </div>
                <span class="text-gray-300">•</span>
                <span class="text-gray-200"
                  >{{ training.studentsCount }} étudiants</span
                >
              </div>
            </div>

            <div class="p-6">
              <BaseButton
                v-if="authStore.isAuthenticated"
                variant="primary"
                size="lg"
                full-width
                @click="startTraining"
                class="mb-4"
              >
                <template #icon-left>
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </template>
                Commencer la formation
              </BaseButton>

              <div v-else class="space-y-3">
                <BaseButton
                  variant="primary"
                  size="lg"
                  full-width
                  @click="$router.push('/auth/signup')"
                >
                  S'inscrire pour commencer
                </BaseButton>
                <BaseButton
                  variant="outline"
                  size="lg"
                  full-width
                  @click="$router.push('/auth/login')"
                >
                  Se connecter
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Training Stats -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Informations
              </h3>
            </template>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Durée</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >{{ training.duration }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Niveau</span
                >
                <BaseBadge :variant="getDifficultyVariant(training.difficulty)">
                  {{ getDifficultyLabel(training.difficulty) }}
                </BaseBadge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Format</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >{{ training.format }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Langue</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >{{ training.language }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Étudiants</span
                >
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >{{ training.studentsCount.toLocaleString() }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Note</span
                >
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >{{ training.rating }}</span
                  >
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Instructor -->
          <BaseCard>
            <template #header>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                Formateur
              </h3>
            </template>

            <div class="flex items-center">
              <img
                :src="training.instructor.avatar"
                :alt="training.instructor.name"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 class="font-medium text-gray-900 dark:text-gray-100">
                  {{ training.instructor.name }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ training.instructor.title }}
                </p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          Formation non trouvée
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          La formation que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <div class="mt-6">
          <BaseButton variant="outline" @click="$router.push('/catalogue')">
            Retour au catalogue
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useTrainingsStore } from "@/stores/trainings";
import BaseCard from "@/components/atoms/BaseCard.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseBadge from "@/components/atoms/BaseBadge.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const trainingsStore = useTrainingsStore();

const isLoading = ref(true);

const training = computed(() => trainingsStore.currentTraining);

const getDifficultyVariant = (difficulty) => {
  const variants = {
    débutant: "success",
    intermédiaire: "warning",
    avancé: "danger",
  };
  return variants[difficulty] || "default";
};

const getDifficultyLabel = (difficulty) => {
  const labels = {
    débutant: "Débutant",
    intermédiaire: "Intermédiaire",
    avancé: "Avancé",
  };
  return labels[difficulty] || difficulty;
};

const startTraining = () => {
  if (training.value && training.value.lessons.length > 0) {
    router.push({
      name: "lesson",
      params: {
        slug: training.value.slug,
        id: training.value.lessons[0].id,
      },
    });
  }
};

onMounted(async () => {
  try {
    const slug = route.params.slug;
    await trainingsStore.fetchTrainingBySlug(slug);
  } finally {
    isLoading.value = false;
  }
});
</script>
