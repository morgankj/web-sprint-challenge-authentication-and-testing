exports.seed = function (knex) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        {
          username: "admin",
          password:
            "$2a$08$5Naw6KK6SOA74YA7/n3EUONvgqAUDHaPjtm5FmBJHjS/YeaXGR/sC",
        },
        {
          username: "joe",
          password:
            "$2a$08$RGtuS1tguiKPTPAanYJG2.s0ksqrb.KSnL0Qmjac9.z2VboFXYsTG",
        },
        {
          username: "sally",
          password:
            "$2a$08$x4HCTxb2JpuYLNEfa10WC.8HROTb0gHTllQFke6zv.eghG77BO5HK",
        },
      ]);
    });
};
