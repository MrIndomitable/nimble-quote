export const NewBomDriver = (app) => {
  const addBom = async(newBom) => {
    await app.post("/api/auctions")
      .send(newBom)
      .expect(201)
      .then(res => res.body);
  };

  return {
    addBom
  }
};