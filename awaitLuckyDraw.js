function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

async function getResults() {
  try {
    const results = [];

    try {
      results.push(await luckyDraw("Tina"));
    } catch (error) {
      results.push(error.message);
    }

    try {
      results.push(await luckyDraw("Jorge"));
    } catch (error) {
      results.push(error.message);
    }

    try {
      results.push(await luckyDraw("Julien"));
    } catch (error) {
      results.push(error.message);
    }

    results.forEach((result) => {
      console.log(result);
    });
  } catch (error) {
    console.error(error);
  }
}

getResults();
