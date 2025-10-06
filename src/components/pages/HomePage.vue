<template>
  <div class="min-h-screen">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    <!-- Header -->
    <HomeHeader />

    <main id="main-content">
      <!-- Hero Section -->
      <section
        class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Hero Content -->
            <div class="text-center lg:text-left">
              <h1
                class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
              >
                Formation Continue pour les
                <span class="text-gray-600 dark:text-gray-300"
                  >Professionnels de Santé</span
                >
              </h1>
              <p
                class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto lg:mx-0"
              >
                Développez vos compétences avec nos formations certifiantes en
                pharmacovigilance, interactions médicamenteuses et gestion
                pharmaceutique au Sénégal.
              </p>

              <!-- Global Search -->
              <form
                class="max-w-3xl mx-auto lg:mx-0 mb-8"
                @submit.prevent="handleSearchSubmit(searchQuery)"
                aria-label="Recherche de formations et contenus"
              >
                <div class="flex gap-3">
                  <div class="flex-1">
                    <SearchInput
                      v-model="searchQuery"
                      size="lg"
                      placeholder="Rechercher une formation, un produit..."
                      @search="handleSearch"
                    />
                  </div>
                  <BaseButton
                    variant="primary"
                    size="lg"
                    type="submit"
                    aria-label="Rechercher"
                  >
                    Rechercher
                  </BaseButton>
                </div>
              </form>

              <!-- CTA Buttons -->
              <div
                class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <BaseButton
                  variant="primary"
                  size="lg"
                  @click="$router.push('/catalogue')"
                  aria-label="Explorer le catalogue des formations"
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </template>
                  Explorer le Catalogue
                </BaseButton>
                <BaseButton
                  v-if="!authStore.isAuthenticated"
                  variant="outline"
                  size="lg"
                  @click="$router.push('/auth/signup')"
                  aria-label="Créer un compte gratuitement"
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
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </template>
                  S'inscrire Gratuitement
                </BaseButton>
              </div>
            </div>

            <!-- Hero Image -->
            <div class="relative">
              <div class="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop&crop=center"
                  alt="Professionnels de santé sénégalais en formation"
                  class="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  loading="eager"
                />
                <!-- Overlay with stats -->
                <div
                  class="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-4"
                >
                  <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div
                        class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                      >
                        2,500+
                      </div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">
                        Professionnels
                      </div>
                    </div>
                    <div>
                      <div
                        class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                      >
                        50+
                      </div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">
                        Formations
                      </div>
                    </div>
                    <div>
                      <div
                        class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                      >
                        98%
                      </div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">
                        Satisfaction
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Decorative elements -->
              <div
                class="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
              ></div>
              <div
                class="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-16 bg-white dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div
                class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
              >
                {{ stats.trainings }}+
              </div>
              <div class="text-gray-600 dark:text-gray-400">Formations</div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
              >
                {{ stats.students }}+
              </div>
              <div class="text-gray-600 dark:text-gray-400">Professionnels</div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
              >
                {{ stats.certificates }}+
              </div>
              <div class="text-gray-600 dark:text-gray-400">Certificats</div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2"
              >
                {{ stats.satisfaction }}%
              </div>
              <div class="text-gray-600 dark:text-gray-400">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Trainings -->
      <section class="py-16 bg-blue-50 dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Formations à la Une
            </h2>
            <p
              class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Découvrez nos formations les plus populaires et les mieux notées
              par la communauté
            </p>
          </div>

          <div
            v-if="isLoading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div v-for="n in 3" :key="n" class="animate-pulse">
              <div class="bg-white dark:bg-gray-900 rounded-lg p-4">
                <div
                  class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"
                ></div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"
                ></div>
                <div
                  class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
                ></div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <TrainingCard
              v-for="training in featuredTrainings"
              :key="training.id"
              :training="training"
              variant="elevated"
            />
          </div>

          <div class="text-center mt-12">
            <BaseButton
              variant="outline"
              size="lg"
              @click="$router.push('/catalogue')"
            >
              Voir Toutes les Formations
              <template #icon-right>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </template>
            </BaseButton>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="py-16 bg-white dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Produits Pharmaceutiques
            </h2>
            <p
              class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Découvrez notre catalogue de produits pharmaceutiques de qualité,
              disponibles pour les professionnels de santé
            </p>
          </div>

          <div
            v-if="productsStore.isLoading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div v-for="n in 3" :key="n" class="animate-pulse">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div
                  class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"
                ></div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"
                ></div>
                <div
                  class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
                ></div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
              variant="elevated"
              :show-request-button="
                authStore.isAuthenticated &&
                authStore.user?.role === 'pharmacist'
              "
              @request="handleProductRequest"
            />
          </div>

          <div class="text-center mt-12">
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <BaseButton
                variant="outline"
                size="lg"
                @click="$router.push('/products')"
                aria-label="Voir tous les produits"
              >
                Voir Tous les Produits
                <template #icon-right>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </template>
              </BaseButton>

              <BaseButton
                v-if="
                  authStore.isAuthenticated &&
                  authStore.user?.role === 'pharmacist'
                "
                variant="primary"
                size="lg"
                @click="$router.push('/services-pharmacie/demande')"
                aria-label="Faire une demande de service pharmacie"
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </template>
                Faire une Demande
              </BaseButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Events Section -->
      <section class="py-16 bg-white dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Événements à venir
            </h2>
            <p
              class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Workshops, masterclass et conférences pour développer vos
              compétences
            </p>
          </div>

          <div
            v-if="upcomingEvents.length === 0"
            class="text-center text-gray-600 dark:text-gray-400"
          >
            Aucun événement à venir pour le moment.
          </div>

          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="eventItem in upcomingEvents"
              :key="eventItem.id"
              class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div class="flex items-center justify-between mb-3">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white dark:bg-blue-500"
                >
                  {{
                    eventItem.type === "training"
                      ? "Formation"
                      : eventItem.type === "conference"
                      ? "Conférence"
                      : "Événement"
                  }}
                </span>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ formatDate(eventItem.date) }}
                </span>
              </div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
              >
                {{ eventItem.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {{ eventItem.description }}
              </p>
              <div
                class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
              >
                <span class="truncate">{{ eventItem.location }}</span>
                <span>
                  {{ eventItem.currentAttendees }}/{{ eventItem.maxAttendees }}
                  inscrits
                </span>
              </div>
              <div class="mt-4">
                <BaseButton
                  variant="outline"
                  size="md"
                  @click="$router.push('/events')"
                  aria-label="Voir les détails de l'événement"
                >
                  Voir les détails
                </BaseButton>
              </div>
            </div>
          </div>
          <div class="text-center mt-12" v-if="upcomingEvents.length > 0">
            <BaseButton
              variant="outline"
              size="lg"
              @click="$router.push('/events')"
              aria-label="Voir tous les événements"
            >
              Voir tous les événements
            </BaseButton>
          </div>
        </div>
      </section>

      <!-- Club Digital Highlight -->
      <section class="py-16 bg-white dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Rejoignez le Club Digital
            </h2>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Accédez à une communauté exclusive de professionnels de santé,
              participez aux forums, échangez avec vos pairs et découvrez les
              dernières opportunités.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <BaseButton
                variant="secondary"
                size="lg"
                @click="$router.push('/club')"
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </template>
                Accéder au Club
              </BaseButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Partners Section -->
      <section class="py-16 bg-blue-50 dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Nos Partenaires
            </h2>
            <p
              class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Ils nous accompagnent pour offrir des formations d'excellence
            </p>
          </div>

          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center"
          >
            <a
              v-for="partner in partners"
              :key="partner.name"
              :href="partner.url"
              target="_blank"
              rel="noopener"
              class="flex items-center justify-center p-4 rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
            >
              <img
                :src="partner.logo"
                :alt="partner.name"
                class="h-12 object-contain grayscale hover:grayscale-0 transition"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section
        id="a-propos"
        class="py-16 bg-white dark:bg-gray-900"
        aria-labelledby="about-heading"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                id="about-heading"
                class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
              >
                À propos de Front E‑Santé
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Notre mission est d'accompagner les professionnels de santé au
                Sénégal avec des formations certifiantes, pratiques et alignées
                sur les besoins du terrain, tout en garantissant accessibilité,
                qualité pédagogique et protection des données.
              </p>
              <ul class="space-y-4" aria-label="Meilleures pratiques">
                <li class="flex items-start gap-3">
                  <span
                    class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
                  >
                    <svg
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-100">
                      Accessibilité inclusive
                    </p>
                    <p class="text-gray-600 dark:text-gray-400">
                      Contrastes adaptés, navigation au clavier, libellés ARIA
                      et contenu lisible.
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span
                    class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
                  >
                    <svg
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-100">
                      Qualité pédagogique
                    </p>
                    <p class="text-gray-600 dark:text-gray-400">
                      Contenus à jour, évaluations formatives, parcours
                      modulaires et certificats reconnus.
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span
                    class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
                  >
                    <svg
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-100">
                      Sécurité des données
                    </p>
                    <p class="text-gray-600 dark:text-gray-400">
                      Conformité RGPD, chiffrement en transit, et respect de la
                      confidentialité.
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span
                    class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white"
                  >
                    <svg
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-100">
                      Performance et fiabilité
                    </p>
                    <p class="text-gray-600 dark:text-gray-400">
                      Chargements rapides, responsive design et disponibilité
                      élevée de la plateforme.
                    </p>
                  </div>
                </li>
              </ul>
              <div class="mt-8">
                <BaseButton
                  variant="outline"
                  size="lg"
                  @click="$router.push('/content/a-propos')"
                  aria-label="En savoir plus sur Front E‑Santé"
                >
                  En savoir plus
                  <template #icon-right>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </template>
                </BaseButton>
              </div>
            </div>
            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1580281657527-47f249e7c44e?w=1200&h=900&fit=crop&crop=center"
                alt="Professionnels de santé collaborant lors d'une formation"
                class="w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div
                class="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
              ></div>
              <div
                class="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-gray-50 dark:bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Pourquoi Choisir Front E-Santé ?
            </h2>
            <p
              class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Une plateforme conçue spécialement pour les professionnels de
              santé au Sénégal
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="text-center"
            >
              <div
                class="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <HealthIcon
                  :name="feature.icon"
                  class="w-8 h-8 text-white dark:text-white"
                />
              </div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
              >
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section
        class="py-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Prêt à Commencer ?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Rejoignez des milliers de professionnels de santé qui développent
            leurs compétences avec nous
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
              v-if="!authStore.isAuthenticated"
              variant="primary"
              size="lg"
              @click="$router.push('/auth/signup')"
              aria-label="Créer un compte gratuit"
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </template>
              Créer un Compte Gratuit
            </BaseButton>
            <BaseButton
              variant="outline"
              size="lg"
              @click="$router.push('/catalogue')"
              aria-label="Explorer les formations"
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </template>
              Explorer les Formations
            </BaseButton>
          </div>
        </div>
      </section>

      <!-- Simple Footer -->
      <SimpleFooter />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useTrainingsStore } from "@/stores/trainings";
import { useProductsStore } from "@/stores/products";
import { mockEvents } from "@/data/mockData";
import SearchInput from "@/components/molecules/SearchInput.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import TrainingCard from "@/components/molecules/TrainingCard.vue";
import ProductCard from "@/components/molecules/ProductCard.vue";
import HomeHeader from "@/components/organisms/HomeHeader.vue";
import SimpleFooter from "@/components/organisms/SimpleFooter.vue";
import HealthIcon from "@/components/atoms/HealthIcon.vue";

const router = useRouter();
const authStore = useAuthStore();
const trainingsStore = useTrainingsStore();
const productsStore = useProductsStore();

const searchQuery = ref("");
const isLoading = ref(true);

const stats = ref({
  trainings: 50,
  students: 2500,
  certificates: 1800,
  satisfaction: 98,
});

const featuredTrainings = computed(() => trainingsStore.featuredTrainings);
const featuredProducts = computed(() => productsStore.featuredProducts);

// Events (workshops, masterclass, etc.)
const allEvents = ref(mockEvents || []);
const upcomingEvents = computed(() =>
  [...allEvents.value]
    .filter((e) => new Date(e.date).getTime() >= Date.now())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)
);

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
}

// Partners
const partners = ref([
  {
    name: "Ministère de la Santé",
    logo: "https://dummyimage.com/240x120/111827/ffffff&text=MSAS",
    url: "#",
  },
  {
    name: "Ordre des Pharmaciens",
    logo: "https://dummyimage.com/240x120/0f172a/ffffff&text=OPS",
    url: "#",
  },
  {
    name: "Université Cheikh Anta Diop",
    logo: "https://dummyimage.com/240x120/111827/ffffff&text=UCAD",
    url: "#",
  },
  {
    name: "CNAM",
    logo: "https://dummyimage.com/240x120/0f172a/ffffff&text=CNAM",
    url: "#",
  },
  {
    name: "ANACMU",
    logo: "https://dummyimage.com/240x120/111827/ffffff&text=ANACMU",
    url: "#",
  },
]);

const features = ref([
  {
    title: "Certificats reconnus",
    description: "Certifications validées par les instances professionnelles.",
    icon: "certificate",
  },
  {
    title: "Contenu localisé",
    description: "Programmes pensés pour le contexte sénégalais et africain.",
    icon: "health-cross",
  },
  {
    title: "Communauté active",
    description: "Échanges entre pairs, entraide et opportunités concrètes.",
    icon: "community",
  },
]);

const handleSearch = (value) => {
  searchQuery.value = value;
};

const handleSearchSubmit = (value) => {
  if (value.trim()) {
    router.push({ name: "catalogue", query: { search: value } });
  }
};

const handleProductRequest = (product) => {
  // Handle product request logic
  console.log("Product request:", product);
  // You can implement a modal or redirect to request form
  router.push({
    name: "product-request",
    params: { productId: product.id },
  });
};

onMounted(async () => {
  try {
    await Promise.all([
      trainingsStore.fetchTrainings(),
      productsStore.fetchProducts(),
    ]);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.skip-link:focus {
  left: 1rem;
  top: 1rem;
  width: auto;
  height: auto;
  padding: 0.5rem 0.75rem;
  background: #111827;
  color: #fff;
  border-radius: 0.375rem;
  z-index: 50;
}
</style>
