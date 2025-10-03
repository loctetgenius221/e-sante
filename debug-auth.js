// Script de débogage pour vérifier l'état d'authentification
console.log("=== DEBUG AUTHENTICATION ===");

// Vérifier le localStorage
const user = localStorage.getItem("user");
console.log("User in localStorage:", user);

if (user) {
  const userData = JSON.parse(user);
  console.log("User data:", userData);
  console.log("User role:", userData.role);
  console.log("Is admin:", userData.role === "admin");
} else {
  console.log("No user found in localStorage");
}

// Vérifier l'URL actuelle
console.log("Current URL:", window.location.href);
console.log("Current path:", window.location.pathname);

// Vérifier les routes disponibles
console.log("Available routes:");
console.log("- /admin/dashboard");
console.log("- /admin/users");
console.log("- /admin/trainings");
console.log("- /admin/certificates");
console.log("- /admin/laboratories");
console.log("- /admin/analytics");
console.log("- /admin/settings");

