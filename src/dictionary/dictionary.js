import "server-only";

const dictionaries = {
  "en-US": () => import("./en-US.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();

// TODO: prepare transform to ts
// import "server-only";

// // Define the type for the dictionary loader
// type DictionaryLoader = () => Promise<Record<string, any>>;

// // Define the dictionary loaders for different locales
// const dictionaries: Record<string, DictionaryLoader> = {
//   "en-US": () => import("./en-US.json").then((module) => module.default),
// };

// // Export an asynchronous function to get the dictionary for a specific locale
// export const getDictionary = async (locale: string): Promise<Record<string, any>> => {
//   const loadDictionary = dictionaries[locale];
//   if (!loadDictionary) {
//     throw new Error(`Dictionary for locale "${locale}" not found.`);
//   }
//   return loadDictionary();
// };
