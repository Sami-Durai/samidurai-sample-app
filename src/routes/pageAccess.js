const userModuleRoutes = [
  "/",
  "dashboard"
];

const userPageAccess = [
  {
    role: "SA",
    route: [
      "/",
      "dashboard",
      "account",
      "donation-collectors"
    ]
  },
  {
    role: "A",
    route: [
      "/",
      "dashboard",
      "account",
      "donation-collectors"
    ]
  },
  {
    role: "AM",
    route: [
      "/",
      "dashboard",
      "account",
      "donation-collectors"
    ]
  },
  {
    role: "DC",
    route: [
      "/",
      "dashboard",
      "account",
      "donation-collectors"
    ]
  }
];

export {
  userPageAccess,
  userModuleRoutes
};
