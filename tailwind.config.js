module.exports = {
   content: ["./src/**/*.{html,js}"],
   theme: {
      extend: {
         backgroundImage: (theme) => ({
            "bg-city": "url('../assets/bg.jpg')",
         }),
         fontFamily: {
            poppins: ["Poppins", "sans-serif"],
         },
      },
   },
   plugins: [],
};
