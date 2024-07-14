export function GenerateID() {
  let aleatoryId = '';
    while (aleatoryId.length !== 4) {
      let aleatoryBool = Math.random() < 0.5 ? 1 : 2;

      const aleatoryNum = Math.floor(Math.random() * 10);

      const randomCode = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
      let aleatoryLetter = String.fromCharCode(randomCode);

      if (aleatoryBool === 1) {
        aleatoryLetter = aleatoryLetter.toLowerCase();
      }

      aleatoryBool = Math.random() < 0.5 ? 1 : 2;

      if (aleatoryBool === 1) {
        aleatoryId += aleatoryLetter;
      } else {
        aleatoryId += String(aleatoryNum);
      }
    }

    return aleatoryId
}