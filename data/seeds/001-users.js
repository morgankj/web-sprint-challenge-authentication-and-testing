exports.seed = function (knex) {
  return knex("users").insert(
    {
      username: "admin",
      password: "$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSe",
    },
    {
      username: "joe",
      password: "$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSf",
    },
    {
      username: "sally",
      password: "$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSg",
    }
  );
};
