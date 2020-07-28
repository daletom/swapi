module.exports = mongoose => {
  const Swapi = mongoose.model(
    "swapi",
    mongoose.Schema(
      {
        title: String,
        episode_id: Number,
        opening_crawl: String,
        director: String,
        producer: String,
        release_date: String,
        /*characters: Array,
        planets: Array,
        starships: Array,
        vehicles: Array,
        species: Array,
        url: String,*/
        image_url: String,
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Swapi;
};